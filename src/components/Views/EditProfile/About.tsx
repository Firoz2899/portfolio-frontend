import { useState, useEffect, useMemo, type ComponentType } from 'react';
import {
  FaMountain, FaLanguage, FaHeart, FaSave, FaPlus, FaTrash,
  FaUser, FaMapMarkedAlt, FaEnvelope, FaPhone, FaMapMarkerAlt,FaCity as FaCityIcon
} from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppActions, useAppSelector } from '@/hooks';
import { Form, FormField, FormItem, HookFormField, useAlert } from '@/components/Common';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, type ProfileFormValues } from '@/schemas';
import type { ILanguage } from '@/types/data.types';
import { cn } from '@/utils';
import {Country, State, type ICountry, type IState} from 'country-state-city'
import { Autocomplete, TextField } from "@mui/material";
import { LanguageLevel } from '@/constants';
import { executeMutation, profileApiHooks } from '@/services';
import type { UpdateProfileForm } from '@/types/payload.types';


export default function About() {
  const {isDarkMode: darkMode} = useThemeMode()
  const {editProfile: profileData, shouldRefreshProfile} = useAppSelector(x => x.profile)
  const {setShouldRefreshProfile} = useAppActions()
  const [updateProfile] = profileApiHooks.useUpdateProfileMutation()
  const { showAlert } = useAlert();
  const [newHobby, setNewHobby] = useState("");
  const [newLanguage, setNewLanguage] = useState({
    Name: "",
    Level: LanguageLevel.BASIC
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData!,
  });

  const {control, handleSubmit, setValue, formState, reset} = form

  const hobbies = useWatch({ control, name: "Hobbies" })

  const languages = (useWatch({ control, name: "Language" }) || []) as ILanguage[];

  const selectedCountry = useWatch({ control, name: "Address.Country" })
  const selectedState = useWatch({ control, name: "Address.State" })

  const countries = useMemo(() => Country.getAllCountries(), []);

  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.Code);
  }, [selectedCountry]);

  useEffect(() => {
    if(!selectedCountry){
      setValue("Address.State", undefined)
    }
  }, [selectedCountry, selectedState])
  
  useEffect(() => {
    if (shouldRefreshProfile && profileData) {
      reset(profileData);
      setNewHobby("")
      setNewLanguage({
        Name: "",
        Level: LanguageLevel.BASIC
      })
      setShouldRefreshProfile(false);
    }
  }, [shouldRefreshProfile, profileData, reset]);

  // Add new interest
  const handleAddHobbie = () => {
    const hobby = newHobby.trim();

    if (!hobby) return;
    if ((hobbies || []).includes(hobby)) return;

    setValue("Hobbies", [...(hobbies || []), hobby], {
      shouldDirty: true,
      shouldValidate: true,
    })
    setNewHobby("")
  };

  // Remove interest
  const handleRemoveHobbie = (hobby: string) => {
    setValue("Hobbies", (hobbies || [])?.filter(x => x !== hobby), {
      shouldDirty: true,
      shouldValidate: true,
    })
  };

  // Add new language
  const handleAddLanguage = () => {
    if (!newLanguage.Name.trim()) return;
    if(!!(languages || []).find(x => x?.Name.trim().toLowerCase() === newLanguage.Name?.trim().toLowerCase())) return

    setValue("Language", [...(languages || []), newLanguage], {
      shouldDirty: true,
      shouldValidate: true,
    })
    setNewLanguage({
      Name: "",
      Level: LanguageLevel.BASIC,
    });
  };

  // Remove language
  const handleRemoveLanguage = (lang: ILanguage) => {
    setValue("Language", (languages || [])?.filter((x) => x?.Name !== lang.Name));
  };

  const handleSave = handleSubmit(async (data, e) => {
    e!.preventDefault();

    const res = await executeMutation(updateProfile(data as UpdateProfileForm).unwrap())

    showAlert({
      type: res.IsSuccess ? "success" : "error",
      message: "Your profile has been updated successfully.",
    });
  });

  // CKEditor configuration
  const editorConfiguration = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'outdent', 'indent', '|',
      'blockQuote', 'insertTable', 'undo', 'redo'
    ],
    height: '300px'
  };

  const inputLabelClassName = cn("block text-sm font-medium mb-1", {
    'text-gray-300' : darkMode,
    'text-gray-700': !darkMode
  });

  const inputIconClassName = cn("absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400");

  const personalInputFieldClassName = cn("w-full px-4 py-3 pl-10 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition", {
    'bg-gray-700 border-gray-600 text-white' : darkMode,
    'bg-white border-gray-300 text-gray-900': !darkMode
  })

  const addressInputFieldClassName = cn("w-full px-4 py-3 pl-10 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition", {
    'bg-gray-700 border-gray-600 text-white' : darkMode,
    'bg-white border-gray-300 text-gray-900': !darkMode
  })

  const sectionHeaderContainerClassName = cn("rounded-xl shadow-lg border",{
    'bg-gray-800 border-gray-700': darkMode,
    'bg-white border-gray-200': !darkMode
  })

  const languageWidthPercentageMap = {
    [LanguageLevel.BASIC]: "40%",
    [LanguageLevel.INTERMEDIATE]: "70%",
    [LanguageLevel.NATIVE]: "100%",
  }

  const autoCompleteSX = {
      "& .MuiOutlinedInput-root": {
        borderRadius: "0.5rem",
        paddingLeft: "2rem",
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",

        "& fieldset": {
          borderColor: darkMode ? "#4b5563" : "#d1d5db",
        },

        "&:hover fieldset": {
          borderColor: "#6366f1",
        },

        "&.Mui-focused fieldset": {
          borderColor: "#6366f1",
          borderWidth: "2px",
        },
      },

      "& .MuiInputBase-input": {
        color: darkMode ? "#ffffff" : "#111827",
      },

      "& .MuiSvgIcon-root": {
        color: darkMode ? "#9ca3af" : "#6b7280",
      },
    };

  const autoCompletePaperSX = {
          bgcolor: darkMode ? "#374151" : "#ffffff",
          color: darkMode ? "#f3f4f6" : "#111827",

          "& .MuiAutocomplete-option": {
            color: darkMode ? "#f3f4f6" : "#111827",
          },

          "& .MuiAutocomplete-option:hover": {
            backgroundColor: darkMode ? "#4b5563" : "#f3f4f6",
          },

          "& .MuiAutocomplete-option[aria-selected='true']": {
            backgroundColor: darkMode ? "#1d4ed8" : "#dbeafe",
            color: "#fff",
          },

          "& .MuiAutocomplete-option.Mui-focused": {
            backgroundColor: darkMode ? "#4b5563" : "#e5e7eb",
          },
        }

  

  return (
    <div className={cn("min-h-screen p-4 md:p-8", {
      'bg-gray-900': darkMode,
      'bg-gray-50': !darkMode
    })}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className={cn("text-3xl md:text-4xl font-bold mb-2", {
                'text-gray-400': darkMode,
                'text-gray-900': !darkMode
              })}>Edit Profile</h1>
              <p className={cn({
                'text-gray-400': darkMode,
                'text-gray-600': !darkMode
              })}>Update your personal information and preferences</p>
            </div>

          </div>
        </div>

          {/* Main Content */}
          <Form {...form}>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-4 space-y-6">
                  {/* Personal Information Card */}
                  <div className={sectionHeaderContainerClassName}>
                    <SectionHeader
                      label='Personal Information'
                      color='blue'
                      icon={FaUser}
                    />

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={control}
                          name='FirstName'
                          render={({field}) => (
                            <HookFormField
                              label='First Name'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaUser className={inputIconClassName} />}
                            >
                              <input className={personalInputFieldClassName} {...field}/>
                            </HookFormField>
                          )}
                        />

                        <FormField
                          control={control}
                          name='LastName'
                          render={({field}) => (
                            <HookFormField
                              label='Last Name'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaUser className={inputIconClassName} />}
                            >
                              <input className={personalInputFieldClassName} {...field}/>
                            </HookFormField>
                          )}
                        />

                        <FormField
                          control={control}
                          name='Email'
                          render={({field}) => (
                            <HookFormField
                              label='Last Name'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaEnvelope className={inputIconClassName} />}
                              >
                              <input className={personalInputFieldClassName} type='email' {...field}/>
                            </HookFormField>
                          )}
                        />
                        
                        <FormField
                          control={control}
                          name='Phone'
                          render={({field}) => (
                            <HookFormField
                              label='Phone Number'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaPhone className={inputIconClassName} />}
                            >
                              <input className={personalInputFieldClassName} {...field}/>
                            </HookFormField>
                          )}
                        />
                        
                      </div>
                    </div>
                  </div>

                  {/* Address Information Card */}
                  <div className={sectionHeaderContainerClassName}>
                    
                    <SectionHeader
                      label='Address Information'
                      color='indigo'
                      icon={FaMapMarkedAlt}
                    />

                    <div className="p-6">
                      <div className="space-y-5">
                        <FormField
                          control={control}
                          name='Address.AddressLine1'
                          render={({field}) => (
                            <HookFormField
                              label='Address Line 1'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                              >
                              <input className={addressInputFieldClassName} placeholder="Street address" {...field}/>
                            </HookFormField>
                          )}
                        />

                        <FormField
                          control={control}
                          name='Address.AddressLine2'
                          render={({field}) => (
                            <HookFormField
                              label='Address Line 2'
                              labelClassName={inputLabelClassName}
                              startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                              >
                              <input className={addressInputFieldClassName} placeholder="Apartment, suite, etc." {...field}/>
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          
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
                            render={({field, fieldState}) => (
                              <HookFormField
                                label='City'
                                labelClassName={inputLabelClassName}
                                startAdornment={<FaCityIcon className={inputIconClassName} />}
                                >
                                  <input className={addressInputFieldClassName} {...field} />
                              </HookFormField>
                            )}
                          />

                          <FormField
                            control={control}
                            name='Address.Pincode'
                            render={({field}) => (
                              <HookFormField
                                label='Pincode/ZIP'
                                labelClassName={inputLabelClassName}
                                startAdornment={<FaMapMarkerAlt className={inputIconClassName} />}
                              >
                                <input className={addressInputFieldClassName} {...field}/>
                              </HookFormField>
                            )}
                          />

                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                      {/* Interests & Hobbies Card */}
                      <div className={sectionHeaderContainerClassName}>
                        
                        <SectionHeader
                          label='Interests & Hobbies'
                          color='pink'
                          icon={FaHeart}
                        />

                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-6">
                            {(hobbies || []).map((hobby) => (
                              <div 
                                key={hobby} 
                                className={cn("flex items-center px-3 py-1.5 rounded-full border", {
                                  'bg-gray-700 border-gray-600' : darkMode,
                                  'bg-gray-100 border-gray-200': !darkMode
                                })}
                              >
                                {/* <div className={`mr-2 ${darkMode ? 'text-pink-400' : 'text-pink-500'}`}>
                                  {availableIcons.find(icon => icon.name === interest.icon)?.component || <FaHeart />}
                                </div> */}
                                <span 
                                  className={cn("text-sm font-medium ", {
                                    'text-white' : darkMode,
                                    'text-gray-800': !darkMode
                                  })}
                                >
                                  {hobby}
                                </span>
                                <button
                                  aria-label='Remove Hobby'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveHobbie(hobby)
                                  }}
                                  className={cn("ml-1.5 p-0.5 rounded-full ", {
                                    'text-gray-400 hover:text-red-400' : darkMode,
                                    'text-gray-500 hover:text-red-500': !darkMode
                                  })}
                                >
                                  <FaTrash size={10} />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div 
                            className={cn("border-t pt-4", {
                              'border-gray-700' : darkMode,
                              'border-gray-200': !darkMode
                            })}
                          >
                            <h3 
                              className={cn("text-base font-medium mb-3", {
                                'text-white' : darkMode,
                                'text-gray-900': !darkMode
                              })}>
                                Add New Interest
                            </h3>
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <input
                                  type="text"
                                  placeholder="Interest name"
                                  value={newHobby}
                                  onChange={(e) => setNewHobby(e.target.value)}
                                  className={cn("w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition", {
                                    'bg-gray-700 border-gray-600 text-white' : darkMode,
                                    'bg-white border-gray-300 text-gray-900': !darkMode
                                  })}
                                />
                                {/* <select
                                  value={newInterest.icon}
                                  onChange={(e) => setNewInterest({ ...newInterest, icon: e.target.value })}
                                  className={`flex-1 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition`}
                                >
                                  {availableIcons.map((icon) => (
                                    <option key={icon.name} value={icon.name}>{icon.name.replace('Fa', '')}</option>
                                  ))}
                                </select> */}
                                <button
                                  aria-label='add hobbie'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddHobbie()
                                  }}
                                  className="px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg transition flex items-center justify-center shadow-md hover:shadow-lg"
                                >
                                  <FaPlus className="mr-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Languages Card */}
                      <div className={sectionHeaderContainerClassName}>
                        
                        <SectionHeader
                          label='Languages'
                          color='green'
                          icon={FaLanguage}
                        />

                        <div className="p-6">
                          <div className="space-y-4 mb-6">
                            {(languages || [])?.map((lang: ILanguage) => (
                              <div 
                                key={lang?.Name} 
                                className={cn("p-4 rounded-lg border", {
                                  'bg-gray-700 border-gray-600' : darkMode,
                                  'bg-gray-50 border-gray-200': !darkMode
                                })}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span 
                                    className={cn("font-medium", {
                                      'text-white' : darkMode, 
                                      'text-gray-900': !darkMode
                                    })}
                                  >
                                    {lang?.Name}
                                  </span>
                                  <div className="flex items-center">
                                    <span 
                                      className={cn("mr-2 px-2 py-0.5 rounded-full text-xs", {
                                        'bg-gray-600 text-gray-300' : darkMode,
                                        'bg-gray-200 text-gray-700': !darkMode
                                      })}
                                    >
                                      {lang?.Level}
                                    </span>
                                    <button
                                      aria-label='Remove Language'
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleRemoveLanguage(lang!)
                                      }}
                                      className={cn("p-1 rounded-full", {
                                        'text-gray-400 hover:text-red-400' : darkMode,
                                        'text-gray-500 hover:text-red-500': !darkMode
                                      })}
                                    >
                                      <FaTrash size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div 
                                  className={cn("w-full rounded-full h-2", {
                                    'bg-gray-600' : darkMode,
                                    'bg-gray-200': !darkMode
                                  })}
                                >
                                  <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                                    style={{ width: languageWidthPercentageMap[lang!.Level] }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div 
                            className={cn("border-t pt-4", {
                              'border-gray-700' : darkMode,
                              'border-gray-200': !darkMode
                            })}
                          >
                            <h3 
                              className={cn("text-base font-medium mb-3", {
                                'text-white' : darkMode,
                                'text-gray-900': !darkMode
                              })}
                            >Add New Language</h3>
                            <div className="space-y-3">
                              <input
                                type="text"
                                placeholder="Language name"
                                value={newLanguage.Name}
                                onChange={(e) => setNewLanguage(prev => ({ ...prev, Name: e.target.value }))}
                                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                              />
                              <div className="flex gap-3">
                                <select
                                  aria-label='NewLanguage Level'
                                  value={newLanguage.Level}
                                  onChange={(e) => setNewLanguage(prev => ({ ...prev, Level: e.target.value as any }))}
                                  className={`flex-1 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                                >
                                  {
                                    Object.values(LanguageLevel).map((item) => (
                                      <option value={item}>{item}</option>
                                    ))
                                  }
                                </select>
                                <button
                                  aria-label='New Language'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddLanguage()
                                  }}
                                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition flex items-center justify-center shadow-md hover:shadow-lg"
                                >
                                  <FaPlus className="mr-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Text Card */}
                  <div className={sectionHeaderContainerClassName}>
                    
                    <SectionHeader
                      label='My Journey'
                      color='purple'
                      icon={FaMountain}
                    />

                    <FormField
                      control={control}
                      name='AboutMe'
                      render={({field: {value, onChange}}) => (
                        <FormItem>
                          <div className="p-6">
                            <div className={cn("ck-editor-wrapper", {"dark": darkMode})}>
                              <CKEditor
                                editor={ClassicEditor as any}
                                data={value || ''}
                                config={editorConfiguration}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  onChange(data)
                                }}
                              />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>


                <div className="lg:col-span-4 flex justify-end">
                  <button
                    aria-label='Submit form'
                    type='submit'
                    disabled={formState.isSubmitting}
                    className={`flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    {formState.isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </Form>
      </div>
      <style>
        {
          `
            .dark .ck-editor__editable {
              background-color: #374151 !important;
              color: #f3f4f6 !important;
            }
            .dark .ck-toolbar {
              background-color: #1f2937 !important;
              border-color: #4b5563 !important;
            }
            .dark .ck.ck-toolbar .ck-toolbar__separator {
              background: #4b5563 !important;
            }
            .dark .ck.ck-toolbar .ck-button {
              color: #f3f4f6 !important;
            }
            .dark .ck.ck-toolbar .ck-button:hover {
              background: #4b5563 !important;
            }
            .dark .ck.ck-toolbar .ck-button.ck-on {
              background: #4b5563 !important;
            }
            .dark .ck.ck-toolbar .ck-dropdown__panel {
              background: #374151 !important;
              border-color: #4b5563 !important;
            }
            .dark .ck.ck-toolbar .ck-list__item .ck-button {
              color: #f3f4f6 !important;
            }
            .dark .ck.ck-toolbar .ck-list__item .ck-button:hover {
              background: #4b5563 !important;
            }
          `
        }
      </style>
    </div>
  );
};

interface ISectionHeader {
  label: string;
  color: SectionColor;
  icon: ComponentType<{
    className?: string;
  }>;
}
type SectionColor =
  | "blue"
  | "indigo"
  | "green"
  | "pink"
  | "purple";

function SectionHeader({
  label,
  color,
  icon: Icon
}: ISectionHeader) {
  const {isDarkMode} = useThemeMode()

  const bgColorMap: Record<SectionColor, string> = {
    blue: isDarkMode ? "bg-blue-900/30" : "bg-blue-100",
    indigo: isDarkMode ? "bg-indigo-900/30" : "bg-indigo-100",
    green: isDarkMode ? "bg-green-900/30" : "bg-green-100",
    pink: isDarkMode ? "bg-pink-900/30" : "bg-pink-100",
    purple: isDarkMode ? "bg-purple-900/30" : "bg-purple-100",
  };

  const textColorMap: Record<SectionColor, string> = {
    blue: isDarkMode ? "text-blue-400" : "text-blue-600",
    indigo: isDarkMode ? "text-indigo-400" : "text-indigo-600",
    green: isDarkMode ? "text-green-400" : "text-green-600",
    pink: isDarkMode ? "text-pink-400" : "text-pink-600",
    purple: isDarkMode ? "text-purple-400" : "text-purple-600",
  };
  return (
    <div 
      className={cn("px-6 py-4 border-b", {
        'border-gray-700' : isDarkMode,
        'border-gray-200': !isDarkMode
      })}
    >
      <div className="flex items-center">
        <div 
          className={cn("p-2 rounded-lg mr-3", bgColorMap[color])}
        >
          <Icon 
            className={cn("text-lg", textColorMap[color])} 
          />
        </div>
        <h2 
          className={cn('text-xl font-semibold', {
            'text-white' : isDarkMode,
            'text-gray-900': !isDarkMode
          })}
        >{label}</h2>
      </div>
    </div>
  )
}