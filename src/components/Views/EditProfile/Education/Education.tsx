// components/Education.js
import { useRef } from 'react';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import { useAppSelector, useAutoCompleteCommonStyle, useCountryState, usePrimitiveFieldArray, useThemeMode } from '@/hooks';
import EducationCard from './EducationCard';
import { educationApiHooks, executeMutation } from '@/services';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSubmitBtnLoader, useAlert } from '@/components/Common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationSchema, type EducationSchemaFormDataInput, type EducationSchemaFormDataOutput } from '@/schemas';
import { Autocomplete, TextField } from '@mui/material';
import type { ICountry, IState } from 'country-state-city';
import type { IEducation } from '@/types/data.types';
import { educationLevels, type EducationLevel } from '@/constants';
import YearPicker from '@/components/Common/YearPicker';

const defaultValues = {
  UniqueCode: undefined,
  EducationLevel: "Bachelor's Degree" as EducationLevel,
  Institute: "",
  Degree: "",
  SpecializationOfStudy: "",
  Description: "",
  StartDate: "",
  EndDate: "",
  Marks: undefined,
  Grade: undefined,

  Address: {
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    Pincode: "",
    State: undefined,
    Country: undefined,
  },
  Achievements: []

};

export default function Education(){
  const {isDarkMode} = useThemeMode()
  const {editProfile} = useAppSelector(x => x.profile)
  const {showAlertMessage} = useAlert()
  const [createApi] = educationApiHooks.useCreateEducationMutation()
  const {autoCompletePaperSX, autoCompleteSX}  = useAutoCompleteCommonStyle()
  
  const form = useForm<EducationSchemaFormDataInput, EducationSchemaFormDataOutput>({
    resolver: zodResolver(educationSchema),
    defaultValues
  });

  const {control, handleSubmit, setValue, reset, clearErrors, formState: {isSubmitting}} = form;
  const {fields: achievements, append, remove} = usePrimitiveFieldArray({control, setValue, name: "Achievements"})

  
  const {countries, states} = useCountryState({
      control,
      setValue,
      countryField: "Address.Country",
      stateField: "Address.State",
  })
  
  // Save all changes
  const handleSave = handleSubmit(async (data, e) => {
    console.log("🚀 ~ Education.tsx:70 ~ Education ~ data:", data);
    e?.preventDefault();
    const res = await executeMutation(createApi(data as IEducation).unwrap());
    showAlertMessage(res.IsSuccess, res.Message);
    if(res.IsSuccess){
      reset(defaultValues, {
        keepErrors: false,
        keepDirty: false,
        keepTouched: false,
        keepIsSubmitted: false,
        keepSubmitCount: false,
      });

      clearErrors();
    }
  }, (err) => {
    console.log("🚀 ~ Education.tsx:45 ~ Education ~ err:", err);
  });

  // Theme classes
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const textMutedClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const tealTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
  const redHoverClass = isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';
  const redTextClass = isDarkMode ? 'text-red-400' : 'text-red-600';

  const inputLabelClass = `block text-sm font-medium mb-1 ${textSecondaryClass}`;
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`;
   
  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <Form {...form}>
          <form onSubmit={handleSave}>
            <div className="flex justify-between items-center mb-8">
              <h1 className={`text-3xl font-bold ${textClass}`}>Education Editor</h1>
              
              {/* <button
                type='submit'
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75 z-auto"
              >
                {isSubmitting ? (
                  <><Loader2 className='animate-spin mr-2' /> Saving...</>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save Changes
                  </>
                )}
              </button> */}
            </div>

            {/* Add New Education Form */}
            <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
                <FaPlus className="mr-2" /> Add New Education
              </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormField
                        control={control}
                        name='Degree'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>Degree</FormLabel>
                                <FormControl>
                                    <input
                                        className={inputClass}
                                        placeholder="Degree Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name='Institute'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>Institution</FormLabel>
                                <FormControl>
                                    <input
                                        className={inputClass}
                                        placeholder="Institution"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="EducationLevel"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>EducationLevel</FormLabel>
                                <FormControl>
                                    <select
                                        className={inputClass}
                                        {...field}
                                    >
                                        <option value="">Select Education Level</option>
                                        {
                                            educationLevels.map(x => (
                                                <option key={x} value={x}>{x}</option>
                                            ))
                                        }
                                    </select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="SpecializationOfStudy"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>Specialization</FormLabel>
                                <FormControl>
                                    <input
                                        className={inputClass}
                                        placeholder="Specialization"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="Marks"
                        render={({field: {value, ...rest}}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>Marks</FormLabel>
                                <FormControl>
                                    <input
                                        className={inputClass}
                                        placeholder="Marks"
                                        type='number'
                                        min={0}
                                        value={value as number}
                                        {...rest}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="Grade"
                        render={({field: {value, ...rest}}) => (
                            <FormItem>
                                <FormLabel className={inputLabelClass}>Grade</FormLabel>
                                <FormControl>
                                    <input
                                        className={inputClass}
                                        placeholder="Grade"
                                        type='number'
                                        min={0}
                                        max={4}
                                        value={value as number}
                                        {...rest}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={control}
                      name='Address.Country'
                      render={({field, fieldState}) => (
                          <FormItem>
                              <FormLabel className={inputLabelClass}>Country</FormLabel>
                              <FormControl>
                                  <Autocomplete
                                      options={countries}
                                      getOptionLabel={(option) => option.name}
                                      value={countries.find((ctry: ICountry) => ctry.isoCode === field.value?.Code) ?? null}
                                      onChange={(_, value) => field.onChange(value ? {
                                          Name: value.name,
                                          Code: value.isoCode,
                                          PhoneCode: value.phonecode,
                                          Flag: value.flag,
                                          Currency: value.currency
                                      } : null)}
                                      isOptionEqualToValue={(option, value) =>
                                          option.isoCode === value?.isoCode
                                      }
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              error={!!fieldState.error}
                                              helperText={fieldState.error?.message}
                                          />
                                      )}
                                      sx={autoCompleteSX}
                                      slotProps={{
                                          paper: {
                                          sx: autoCompletePaperSX,
                                          },
                                      }}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={control}
                      name='Address.State'
                      render={({field, fieldState}) => (
                          <FormItem>
                              <FormLabel className={inputLabelClass}>Province/State</FormLabel>
                              <FormControl>
                                  <Autocomplete
                                      options={states}
                                      getOptionLabel={(option) => option.name}
                                      value={states.find(
                                          (state: IState) =>
                                          state.countryCode === field.value?.CountryCode &&
                                          state.isoCode === field.value?.Code
                                      ) ?? null}
                                      onChange={(_, value) => field.onChange(value ? {
                                          Name: value.name,
                                          CountryCode: value.countryCode,
                                          Code: value.isoCode
                                      } : null)}
                                      isOptionEqualToValue={(option, value) =>
                                          option.countryCode === value?.countryCode
                                          && option.isoCode === value?.isoCode
                                      }
                                      renderInput={(params) => (
                                          <TextField
                                          {...params}
                                          error={!!fieldState.error}
                                          helperText={fieldState.error?.message}
                                          />
                                      )}
                                      sx={autoCompleteSX}
                                      slotProps={{
                                          paper: {
                                          sx: autoCompletePaperSX,
                                          },
                                      }}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={control}
                      name='Address.City'
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={inputLabelClass}>City</FormLabel>
                              <FormControl>
                                  <input
                                      className={inputClass}
                                        placeholder="City"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={control}
                      name='Address.Pincode'
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={inputLabelClass}>PinCode</FormLabel>
                              <FormControl>
                                  <input
                                      className={inputClass}
                                        placeholder="PinCode"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={control}
                      name='StartDate'
                      render={({field}) => (
                        <FormItem>
                            <FormLabel className={inputLabelClass}>Start Period</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <YearPicker
                                        value={field.value}
                                        onChange={field.onChange}
                                        className={inputClass}
                                        theme={isDarkMode ? "dark" : "light"}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage/>
                        </FormItem>
                      )}
                  />
                  <FormField 
                      control={control}
                      name='EndDate'
                      render={({field}) => (
                         <FormItem>
                            <FormLabel className={inputLabelClass}>End Period</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <YearPicker
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        className={inputClass}
                                        theme={isDarkMode ? "dark" : "light"}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage/>
                        </FormItem>
                      )}
                  />
                  </div>
                  
                  <FormField
                      control={control}
                      name='Description'
                      render={({field}) => (
                          <FormItem className="mb-6">
                              <FormLabel className={inputLabelClass}>Description</FormLabel>
                              <FormControl>
                                  <textarea
                                      rows={2}
                                      className={inputClass}
                                      placeholder="Education description"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className={`block text-sm font-medium ${textSecondaryClass}`}>Achievements</label>
                       <button
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                append("")
                            }}
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Achievement
                        </button>
                    </div>
                    {achievements.map((_, index) => (
                      <FormField
                        control={control}
                        name={`Achievements.${index}`}
                        render={({field}) => (
                            <FormItem key={`Achievements.${index}.card`}>
                                <div className="flex items-center mb-2">
                                    <FormControl>
                                        <input
                                          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                                          placeholder="Achievement description"
                                          {...field}
                                        />
                                    </FormControl>
                                    <button
                                        aria-label="delete Achievement"
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          remove(index)
                                        }}
                                        // disabled={editEducation.achievements.length <= 1}
                                        className={`ml-2 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <div className='flex justify-end'>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                    className={`flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                        {isSubmitting ? <FormSubmitBtnLoader className='mr-2' /> : <FaSave className="mr-2" />}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
            </div>
          </form>
        </Form>

        {/* Existing Education */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Education</h2>
          
          {!editProfile?.Educations?.length && (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No education entries yet. Add your first education above.
            </div>
          )}
          
          {(editProfile?.Educations || [])?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editProfile?.Educations?.map((edu) => (
                <EducationCard key={edu.UniqueCode} data={edu} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};