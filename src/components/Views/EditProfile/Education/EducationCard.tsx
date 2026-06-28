import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel, useAlert } from '@/components/Common';
import { DATE_FORMATS, educationLevels } from '@/constants';
import { useAutoCompleteCommonStyle, useCountryState, useDeepCompareEffect, usePrimitiveFieldArray, useThemeMode } from '@/hooks';
import { educationSchema, type EducationSchemaFormData, type EducationSchemaFormDataInput, type EducationSchemaFormDataOutput } from '@/schemas';
import { educationApiHooks, executeMutation } from '@/services';
import type { IEducation } from '@/types/data.types'
import { formatDate } from '@/utils/basic.helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, TextField } from '@mui/material';
import type { ICountry, IState } from 'country-state-city';
import { Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaEdit, FaGraduationCap, FaMapMarkerAlt, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import YearPicker from '@/components/Common/YearPicker';

interface IEducationCard {
    data: IEducation
}

export default function EducationCard({
    data
}: IEducationCard) {
    const {isDarkMode} = useThemeMode()
    const {showAlertMessage, showConfirmation} = useAlert()
    const [loading, setLoading] = useState<boolean>(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [deleteApi] = educationApiHooks.useDeleteEducationMutation()
    const [updateApi] = educationApiHooks.useUpdateEducationMutation()
    const {autoCompletePaperSX, autoCompleteSX}  = useAutoCompleteCommonStyle()
    
    const form = useForm<EducationSchemaFormDataInput, EducationSchemaFormDataOutput>({
        resolver: zodResolver(educationSchema),
        defaultValues: data!
    });

    const {control, handleSubmit, setValue, reset, clearErrors, formState: {isSubmitting}} = form;
    const {fields: achievements, append, remove} = usePrimitiveFieldArray({control, setValue, name: "Achievements"})

    
    const {countries, states} = useCountryState({
        control,
        setValue,
        countryField: "Address.Country",
        stateField: "Address.State",
    })
  

    useDeepCompareEffect(() => {
        resetExperienceForm();
    }, [data])

    const resetExperienceForm = () => {
        reset(data, {
            keepErrors: false,
            keepDirty: false,
            keepTouched: false,
            keepIsSubmitted: false,
            keepSubmitCount: false,
        });

        clearErrors();
    };

    const deleteEducation = async () => {
        showConfirmation({
            title: `Are you sure? you want to delete "${data.Degree}"`,
            confirmLabel: "Yes, Sure!",
            onConfirm: async () => {
                setLoading(true)
                const res = await executeMutation(deleteApi(data.UniqueCode!).unwrap());
                showAlertMessage(res.IsSuccess, res.Message)
                setLoading(false)
            }
        })
    }

    const cancelEditing = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditMode(false)
    }

    const startEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        resetExperienceForm();
        setIsEditMode(true);
    }

    const onSubmit = handleSubmit(async (data, e) => {
        console.log("🚀 ~ EducationCard.tsx:90 ~ EducationCard ~ data:", data);
        e?.preventDefault();
        const res = await executeMutation(updateApi(data as IEducation).unwrap());
        showAlertMessage(res.IsSuccess, res.Message)
        if(res.IsSuccess){
            setIsEditMode(false)
        }
    }, (error) => {
        console.log(error)
    })
    
    // Theme classes
    const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
    const textSecondaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
    const inputBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
    const tealTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
    const tealHoverClass = isDarkMode ? 'hover:text-teal-300' : 'hover:text-teal-800';
    const redHoverClass = isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';
    const redTextClass = isDarkMode ? 'text-red-400' : 'text-red-600';

    const inputLabelClass = `block text-sm font-medium mb-1 ${textSecondaryClass}`;
    const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`;

    return (
        <div key={data.UniqueCode} className={`${cardBgClass} rounded-2xl p-6 border shadow-sm relative ${borderClass}`}>
            {isEditMode && (
                // Edit Mode
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-lg font-semibold ${textClass}`}>Editing Education</h3>
                                <div className="flex space-x-2">
                                    <button
                                        aria-label="save education"
                                        type='submit'
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        {isSubmitting ? <Loader2 className='animate-spin' /> : <FaSave />}
                                    </button>
                                    <button
                                        aria-label='cancel editing'
                                        type='button'
                                        onClick={cancelEditing}
                                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 mb-4">
                                <FormField
                                    control={control}
                                    name='Degree'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={inputLabelClass}>Degree</FormLabel>
                                            <FormControl>
                                                <input
                                                    className={inputClass}
                                                    placeholder='Degree'
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
                                                    placeholder='Institution'
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
                                                        educationLevels?.map(x => (
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
                                                    placeholder='Specialization'
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
                                                    placeholder='Marks'
                                                    className={inputClass}
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
                                                    placeholder='Grade'
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
                                                    placeholder='City'
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
                                                    placeholder='PinCode'
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
                                {/* <div>
                                    <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Period</label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                                    />
                                </div> */}
                            </div>
                            
                            <FormField
                                control={control}
                                name='Description'
                                render={({field}) => (
                                    <FormItem className="mb-4">
                                        <FormLabel className={inputLabelClass}>Description</FormLabel>
                                        <FormControl>
                                            <textarea
                                                rows={2}
                                                className={inputClass}
                                                    placeholder='Description'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className={`block text-sm font-medium ${textSecondaryClass}`}>Achievements</label>
                                    <button
                                        aria-label='append achievement'
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            append("")
                                        }}
                                        className={`text-xs flex items-center ${tealTextClass} ${tealHoverClass}`}
                                    >
                                        <FaPlus className="mr-1" /> Add
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
                                                            className={`flex-1 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                                                            placeholder='Achievement'
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
                                                        className={`ml-2 p-1 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </form>
                </Form>
            )}

            {!isEditMode && (
                // View Mode
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white mr-3">
                                <FaGraduationCap />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${textClass}`}>{data.Degree}</h3>
                                <p className={`text-md font-medium ${tealTextClass}`}>{data.Institute}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                aria-label='edit education'
                                disabled={loading}
                                onClick={startEdit}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <FaEdit />
                            </button>
                            <button
                                aria-label='delete education'
                                disabled={loading}
                                onClick={deleteEducation}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                {loading ? <Loader2 className='animate-spin' /> : <FaTrash />}
                            </button>
                        </div>
                    </div>

                    <div className={`flex items-center mb-2 ${tealTextClass}`}>
                        <FaMapMarkerAlt className="mr-2" />
                        <span>
                            {[
                                data.Address?.City,
                                data.Address?.State?.Name,
                                data.Address?.Country?.Name,
                                data.Address?.Pincode
                            ].joinTruthy(", ")}
                        </span>
                    </div>

                    <div className={`flex items-center mb-3 ${tealTextClass}`}>
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate({
                            date: data.StartDate,
                            formatString: DATE_FORMATS.YEAR
                        })} - {formatDate({
                            date: data.EndDate,
                            formatString: DATE_FORMATS.YEAR,
                            defaultValue: "Present"
                        })}</span>
                    </div>

                    <p className={`mb-3 text-sm ${textSecondaryClass}`}>{data.Description}</p>

                    {
                        data.Achievements.length > 0 && (
                            <div>
                                <h4 className={`font-medium mb-2 text-sm ${textClass}`}>Achievements:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {data.Achievements?.map((achievement, index) => (
                                        <li key={index} className={`text-sm ${textSecondaryClass}`}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            )}

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-b-xl"></div>
        </div>
    )
}
