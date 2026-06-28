import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Country, State, type ICountry, type IState } from 'country-state-city';
import { useRef, useEffect, useMemo } from 'react';
import { FaPlus, FaTrash, FaSave, FaCalendarAlt, FaBuilding, FaMapMarkerAlt, FaPhone, FaGlobe, FaUserTie, FaEnvelope, FaTrophy } from 'react-icons/fa';
import { useForm, useWatch } from "react-hook-form";
import Flatpickr, { type OptionsType } from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import { useAppSelector, useAutoCompleteCommonStyle, usePrimitiveFieldArray, useThemeMode } from '@/hooks';
import ExperienceCard from './ExperienceCard';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceSchema, type ExperienceSchemaFormData } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSubmitBtnLoader, HookFormField, useAlert } from '@/components/Common';
import { executeMutation, experienceApiHooks } from '@/services';
import type { IExperience } from '@/types/data.types';

const defaultValues = {
  UniqueCode: "",
  Position: "",
  Company: "",
  Address: {
    Country: undefined,
    State: undefined,
    City: "",
    Pincode: "",
    AddressLine1: "",
    AddressLine2: "",
  },
  StartDate: "",
  EndDate: "",
  Phone: "",
  Website: "",
  Description: "",
  Achievements: [],
};


export default function Experience() {

  const {isDarkMode} = useThemeMode()
  const {editProfile} = useAppSelector(x => x.profile)
  const { showAlertMessage } = useAlert();
  const [createExperienceApi] = experienceApiHooks.useCreateExperienceMutation()
  const [updateExperienceApi] = experienceApiHooks.useUpdateExperienceMutation()
  const {autoCompletePaperSX, autoCompleteSX}  = useAutoCompleteCommonStyle()
  

  // Refs for Flatpickr instances
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const form = useForm<ExperienceSchemaFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues
  })
  const { handleSubmit, control, formState, reset, setValue, clearErrors } = form;
  const selectedCountry = useWatch({ control, name: "Address.Country" })
  const {fields, append, remove} = usePrimitiveFieldArray({control, name: "Achievements", setValue})
  const uniqueCode = useWatch({control, name: "UniqueCode"})

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.Code);
  }, [selectedCountry]);

  useEffect(() => {
    if(!selectedCountry){
      setValue("Address.State", undefined)
    }
  }, [selectedCountry])
  

  // Initialize Flatpickr with options
  const flatpickrOptions = {
    plugins: [
      monthSelectPlugin({
        dateFormat: "M Y",
        altFormat: "F Y",
        theme: isDarkMode ? "dark" : "light"
      })
    ],
  } as OptionsType ;

  const resetExperienceForm = (exp?: IExperience) => {
    reset(exp ?? defaultValues, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });

    (startDateRef.current as any)?.flatpickr?.setDate(exp ? exp.StartDate : "", false);
    (endDateRef.current as any)?.flatpickr?.setDate(exp ? exp.EndDate : "", false);

    clearErrors();
  };

  // Save all changes
  const handleSave = handleSubmit(async (data) => {
    let res;
    if(!data.UniqueCode)
      res = await executeMutation(createExperienceApi(data as IExperience).unwrap());
    else
      res = await executeMutation(updateExperienceApi(data as IExperience).unwrap());

    showAlertMessage(res.IsSuccess, res.Message)
    if(res.IsSuccess)
      resetExperienceForm();
    
  }, (error) => {
    console.log("🚀 ~ Experience.tsx:134 ~ Experience ~ error:", error);
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
  const redHoverClass = isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';

  const inputLabelClassName = `block text-sm font-medium mb-1 ${textSecondaryClass}`;
  const inputIconClassName = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";
  const inputClassName = `w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`;

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Edit Experience</h1>
        </div>

        {/* Add New Experience Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <Form {...form}>
            <form onSubmit={handleSave} className="get-in-touch-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField 
                  control={control}
                  name='Position'
                  render={({field}) => (
                    <HookFormField
                      label='Position'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaUserTie className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field}/>
                    </HookFormField>
                  )}
                />
                <FormField 
                  control={control}
                  name='Company'
                  render={({field}) => (
                    <HookFormField
                      label='Company'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaBuilding className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field}/>
                    </HookFormField>
                  )}
                />
                <FormField
                  control={control}
                  name='Address.Country'
                  render={({field, fieldState}) => (
                    <HookFormField
                      label='Country'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                    >
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
                    </HookFormField>
                  )}
                />
                <FormField
                  control={control}
                  name='Address.State'
                  render={({field, fieldState}) => (
                    <HookFormField
                        label='State/Province'
                        labelClassName={inputLabelClassName}
                        startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                      >
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
                    </HookFormField>
                  )}
                />
                <FormField 
                  control={control}
                  name='Address.City'
                  render={({field}) => (
                    <HookFormField
                      label='City'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaBuilding className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field}/>
                    </HookFormField>
                  )}
                />
                <FormField 
                  control={control}
                  name='Address.Pincode'
                  render={({field}) => (
                    <HookFormField
                      label='Pincode/Zip'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field} placeholder="Pincode"/>
                    </HookFormField>
                  )}
                />
                <FormField 
                  control={control}
                  name='StartDate'
                  render={({field}) => (
                    <FormItem>
                      <div>
                        <FormLabel className={inputLabelClassName}>Start Period</FormLabel>
                        <div className="relative">
                          <Flatpickr
                            ref={startDateRef}
                            options={{
                              ...flatpickrOptions,
                              onChange: (_, dateStr) => {
                                setValue("StartDate", dateStr, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                  shouldTouch: true,
                                });
                              }
                            }}
                            className={inputClassName}
                            placeholder="Jan 2025"
                          />
                          <FaCalendarAlt className={inputIconClassName} />
                        </div>
                        <FormControl>
                          <input
                          type="hidden"
                          {...field}
                        />
                        </FormControl>
                        <FormMessage/>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField 
                  control={control}
                  name='EndDate'
                  render={({field: {value, ...rest}}) => (
                    <FormItem>
                      <div>
                        <FormLabel className={inputLabelClassName}>End Period</FormLabel>
                        <div className="relative">
                          <Flatpickr
                            ref={endDateRef}
                            options={{
                              ...flatpickrOptions,
                              onChange: (_, dateStr) => {
                                setValue("EndDate", dateStr, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                  shouldTouch: true,
                                });
                              }
                            }}
                            className={inputClassName}
                            placeholder="Jan 2025"
                          />
                          <FaCalendarAlt className={inputIconClassName} />
                        </div>
                        <input
                          type="hidden"
                          value={value ?? ""}
                          {...rest}
                        />
                        <FormMessage/>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField 
                  control={control}
                  name='Phone'
                  render={({field}) => (
                    <HookFormField
                      label='Phone'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaPhone className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field} placeholder="eg. 9898989898" />
                    </HookFormField>
                  )}
                />
                <FormField 
                  control={control}
                  name='Website'
                  render={({field}) => (
                    <HookFormField
                      label='Website Link'
                      labelClassName={inputLabelClassName}
                      startAdornment={<FaGlobe className={inputIconClassName} />}
                    >
                      <input className={inputClassName} {...field} placeholder="https://google.com" />
                    </HookFormField>
                  )}
                />
              </div>
              
              <FormField 
                  control={control}
                  name="Description"
                  render={({field}) => (
                    <HookFormField
                      label='Description'
                      labelClassName={inputLabelClassName}
                      formItemClassName="mb-6"
                      startAdornment={<FaEnvelope className="absolute left-3 top-3 text-gray-400" />}
                    >
                      <textarea className={inputClassName} {...field} placeholder="Description" rows={4} />
                    </HookFormField>
                  )}
                />

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className={`block text-sm font-medium ${textSecondaryClass}`}>Key Achievements</label>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      append("")
                    }}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                  >
                    <FaPlus className="mr-2" /> Add Achievements
                  </button>
                </div>
                
                {fields?.map((_, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <FormField
                      control={control}
                      name={`Achievements.${index}`}
                      render={({field}) => (
                        <FormItem className='flex-1'>
                          <div className="relative flex-1">
                            <FaTrophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              {...field}
                              className={inputClassName}
                              placeholder="Achievement description"
                            />
                          </div>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <button
                      aria-label='Remove Achievement'
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index)
                      }}
                      // disabled={fields.length <= 1}
                      className={`ml-2 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${textMutedClass} ${redHoverClass}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 flex justify-end">
                {uniqueCode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      resetExperienceForm();
                    }}
                    className={`flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mr-3`}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className={`flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {formState.isSubmitting ? (
                    <>
                      <FormSubmitBtnLoader/>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>

        {/* Experiences List */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Your Experiences</h2>

          {(editProfile?.Experiences || []).length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              <p>No experiences added yet. Add your first experience using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(editProfile?.Experiences || []).map((exp) => (
                <ExperienceCard key={exp.UniqueCode} data={exp} onEdit={() => {
                  resetExperienceForm(exp);
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for Flatpickr */}
      <style>{`
        /* Flatpickr Custom Styles */
        .flatpickr-input {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
          color: ${isDarkMode ? '#e5e7eb' : '#1f2937'} !important;
          border: 1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .flatpickr-input:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2) !important;
          outline: none !important;
        }
        
        .flatpickr-calendar {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
          border: 1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'} !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }
        
        .flatpickr-months {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
          border-bottom: 1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'} !important;
        }
        
        .flatpickr-month {
          color: ${isDarkMode ? '#f3f4f6' : '#1f2937'} !important;
          fill: ${isDarkMode ? '#f3f4f6' : '#1f2937'} !important;
        }
        
        .flatpickr-current-month {
          color: ${isDarkMode ? '#f3f4f6' : '#1f2937'} !important;
          font-weight: 600 !important;
        }
        
        .flatpickr-weekdays {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-weekday {
          color: ${isDarkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        .flatpickr-days {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-day {
          color: ${isDarkMode ? '#e5e7eb' : '#1f2937'} !important;
          border-radius: 0.375rem !important;
        }
        
        .flatpickr-day:hover {
          background-color: ${isDarkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .flatpickr-day.selected {
          background-color: #0d9488 !important;
          color: white !important;
          font-weight: 600 !important;
        }
        
        .flatpickr-day.inRange {
          background-color: ${isDarkMode ? '#0f766e' : '#14b8a6'} !important;
          color: white !important;
        }
        
        .flatpickr-day.prevMonthDay,
        .flatpickr-day.nextMonthDay {
          color: ${isDarkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .flatpickr-day.disabled {
          color: ${isDarkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .numInputWrapper span {
          border-color: ${isDarkMode ? '#4b5563' : '#d1d5db'} !important;
        }
        
        .numInputWrapper span:hover {
          background-color: ${isDarkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .numInputWrapper span.arrowUp {
          border-bottom-color: ${isDarkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        .numInputWrapper span.arrowDown {
          border-top-color: ${isDarkMode ? '#9ca3af' : '#6b7280'} !important;
        }
        
        /* Month Select Plugin Styles */
        .flatpickr-monthSelect-months,
        .flatpickr-monthSelect-years {
          background-color: ${isDarkMode ? '#374151' : '#ffffff'} !important;
        }
        
        .flatpickr-monthSelect-month,
        .flatpickr-monthSelect-year {
          color: ${isDarkMode ? '#e5e7eb' : '#1f2937'} !important;
        }
        
        .flatpickr-monthSelect-month:hover,
        .flatpickr-monthSelect-year:hover {
          background-color: ${isDarkMode ? '#4b5563' : '#f3f4f6'} !important;
        }
        
        .flatpickr-monthSelect-month.selected,
        .flatpickr-monthSelect-year.selected {
          background-color: #0d9488 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};