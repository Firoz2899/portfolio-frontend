import { useState, useEffect, useRef } from 'react';
import { 
  useWatch, 
  useFormContext, 
  type Control, 
  type FieldPath, 
  type FieldValues, 
  type PathValue,
  type UseFormSetValue
} from 'react-hook-form';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface UsePrimitiveFieldArrayProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control?: Control<TFieldValues>;
  setValue?: UseFormSetValue<TFieldValues>; // Pass RHF's public setValue method
  name: TName;
}

export function usePrimitiveFieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, setValue, name }: UsePrimitiveFieldArrayProps<TFieldValues, TName>) {
  const context = useFormContext<TFieldValues>();
  
  const activeControl = control || context?.control;
  const activeSetValue = setValue || context?.setValue;

  // We need both control (to watch changes) and setValue (to write changes)
  if (!activeControl) {
    throw new Error('usePrimitiveFieldArray requires "control". Pass it in properties or wrap the form inside <FormProvider>.');
  }
  if (!activeSetValue) {
    throw new Error('usePrimitiveFieldArray requires "setValue". Pass it in properties or wrap the form inside <FormProvider>.');
  }

  // 1. Watch the state of the primitive array in the form
  const rawValues = (useWatch({
    control: activeControl,
    name,
  }) as any[]) || [];

  // 2. Local state to map raw values to stable IDs for rendering keys
  const [fields, setFields] = useState<{ id: string; value: any }[]>([]);

  // Track values to prevent re-render loops during state updates
  const prevRawValuesRef = useRef<any[]>([]);

  // 3. Keep internal fields mapped to RHF form values, preserving stable IDs
  useEffect(() => {
    const rawValuesJson = JSON.stringify(rawValues);
    const prevValuesJson = JSON.stringify(prevRawValuesRef.current);

    if (rawValuesJson !== prevValuesJson) {
      setFields((prevFields) => {
        return rawValues.map((val, index) => {
          if (prevFields[index]) {
            return { id: prevFields[index].id, value: val };
          }
          return { id: generateId(), value: val };
        });
      });
      prevRawValuesRef.current = rawValues;
    }
  }, [rawValues]);

  // Safely write flat changes back to React Hook Form using the public API
  const updateFormState = (newRawValues: any[]) => {
    activeSetValue(name, newRawValues as PathValue<TFieldValues, TName>, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const append = (value: any) => {
    const nextRaw = [...rawValues, value];
    setFields((prev) => [...prev, { id: generateId(), value }]);
    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const prepend = (value: any) => {
    const nextRaw = [value, ...rawValues];
    setFields((prev) => [{ id: generateId(), value }, ...prev]);
    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const remove = (index: number) => {
    const nextRaw = rawValues.filter((_, i) => i !== index);
    setFields((prev) => prev.filter((_, i) => i !== index));
    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const insert = (index: number, value: any) => {
    const nextRaw = [...rawValues];
    nextRaw.splice(index, 0, value);

    setFields((prev) => {
      const updated = [...prev];
      updated.splice(index, 0, { id: generateId(), value });
      return updated;
    });

    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const swap = (indexA: number, indexB: number) => {
    const nextRaw = [...rawValues];
    const tempVal = nextRaw[indexA];
    nextRaw[indexA] = nextRaw[indexB];
    nextRaw[indexB] = tempVal;

    setFields((prev) => {
      const updated = [...prev];
      const tempField = updated[indexA];
      updated[indexA] = updated[indexB];
      updated[indexB] = tempField;
      return updated;
    });

    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const move = (from: number, to: number) => {
    const nextRaw = [...rawValues];
    const [movedItem] = nextRaw.splice(from, 1);
    nextRaw.splice(to, 0, movedItem);

    setFields((prev) => {
      const updated = [...prev];
      const [movedField] = updated.splice(from, 1);
      updated.splice(to, 0, movedField);
      return updated;
    });

    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const update = (index: number, value: any) => {
    const nextRaw = [...rawValues];
    nextRaw[index] = value;

    setFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });

    prevRawValuesRef.current = nextRaw;
    updateFormState(nextRaw);
  };

  const replace = (newValues: any[]) => {
    const nextFields = newValues.map((val) => ({ id: generateId(), value: val }));
    setFields(nextFields);
    prevRawValuesRef.current = newValues;
    updateFormState(newValues);
  };

  return {
    fields,
    append,
    prepend,
    remove,
    insert,
    swap,
    move,
    update,
    replace,
  };
}