// components/Skills.js
import { useEffect, useState } from 'react';
import { FaLeaf, FaPlus, FaTrash } from 'react-icons/fa';
import { useAppActions, useAppSelector, useThemeMode } from '@/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSkillSchema, addSubSkillSchema, addTechnologySchema, type AddSkillSchemaFormData, type AddSubSkillSchemaFormData, type AddTechnologySchemaFormData } from '@/schemas/skillSchema';
import { Form, FormField, FormItem, FormMessage, FormControl, FormLabel, useAlert } from '@/components/Common';
import { Loader2 } from 'lucide-react';
import CategoryWithSkillCard from './CategoryWithSkillCard';
import { executeMutation, skillApiHooks } from '@/services';

const initialSkill = {
  Title: "",
  Icon: ""
}

const initialSubSkill = {
  Name: "",
  Category: "",
  Percentage: 80
}

export default function Skills(){

  const {showAlertMessage, showConfirmation} = useAlert()
  const {isDarkMode} = useThemeMode()
  const {skills, editProfile} = useAppSelector(x => x.profile)
  const {profile} = useAppActions()
  const [updateTechnologyApi] = skillApiHooks.useUpdateTechnologyMutation()
  const [createSkillApi] = skillApiHooks.useCreateSkillMutation()
  const [createSubSkillApi] = skillApiHooks.useCreateSubSkillMutation()


  const skillForm = useForm<AddSkillSchemaFormData>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: initialSkill
  })

  const subSkillForm = useForm({
    resolver: zodResolver(addSubSkillSchema),
    defaultValues: initialSubSkill
  })

  const techForm = useForm<AddTechnologySchemaFormData>({
    resolver: zodResolver(addTechnologySchema),
    defaultValues: {
      Name: ""
    }
  })

  useEffect(() => {
    profile.setSkills(editProfile?.Skills || [])
  }, [editProfile])
  
  const handleDeleteTechnology = async (tech: any) => {
    showConfirmation({
      title: `Are you sure, you want to delete "${tech}".`,
      onConfirm: async () => {
        const res = await executeMutation(updateTechnologyApi({Technologies: editProfile!.Technologies.filter(x => x != tech)}).unwrap());
        showAlertMessage(res.IsSuccess, res.IsSuccess ? "Technology deleted successfully." : res.Message);
      }
    })
  };

  const handleSaveSkill = skillForm.handleSubmit(async (data) => {
    const res = await executeMutation(createSkillApi(data).unwrap())
    showAlertMessage(res.IsSuccess, res.Message)
    if(res.IsSuccess){
      skillForm.reset(initialSkill)
    }
  })

  const handleSaveSubSkill = subSkillForm.handleSubmit(async (data) => {
    const res = await executeMutation(createSubSkillApi(data).unwrap())
    if(res){
      showAlertMessage(res.IsSuccess, res.Message)
      if(res.IsSuccess){
        subSkillForm.reset(initialSubSkill)
      }
    }
  })

  const handleSaveTechnology = techForm.handleSubmit(async (data) => {
    if(!!((editProfile!.Technologies || [])?.find(x => x.trim().toLowerCase() === data.Name.trim().toLowerCase()))){
      techForm.setError("Name", {
        message: "Technology is already exist.",
      }, {
        shouldFocus: true
      })
      return;
    }
    const res = await executeMutation(updateTechnologyApi({Technologies: [...(editProfile!.Technologies || []), data.Name]}).unwrap());
    showAlertMessage(res.IsSuccess, res.Message);
    if(res.IsSuccess){
      techForm.reset({Name: ""})
    }
  })

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Skills Editor</h1>
            {/* <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
            >
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              )}
            </button> */}
          </div>

          {/* {saveSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center">
              <FaSave className="mr-2" /> Changes saved successfully!
            </div>
          )} */}

          {/* Add New Category Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Category
            </h2>
            
            <Form {...skillForm}>
              <form onSubmit={handleSaveSkill}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={skillForm.control}
                    name='Title'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Title</FormLabel>
                        <FormControl>
                          <input
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., Mobile Development"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />                      
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={skillForm.control}
                    name='Icon'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            {...field}
                          >
                            <option value="mountain">Mountain</option>
                            <option value="tree">Tree</option>
                            <option value="leaf">Leaf</option>
                            <option value="hiking">Hiking</option>
                          </select>
                        </FormControl>
                        <FormMessage />                      
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <button
                      type='submit'
                      disabled={skillForm.formState.isSubmitting}
                      className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
                    >
                      {skillForm.formState.isSubmitting 
                          ? <Loader2 className='mr-2 animate-spin'/> 
                          : <FaPlus className="mr-2" />
                      }
                      {skillForm.formState.isSubmitting 
                          ? "Adding..."
                          : "Add Category"
                      }
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Add New Skill Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaPlus className="mr-2" /> Add New Skill
            </h2>
            
            <Form {...subSkillForm}>
              <form onSubmit={handleSaveSubSkill}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField
                    control={subSkillForm.control}
                    name='Name'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</FormLabel>
                        <FormControl>
                          <input
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., React Native"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={subSkillForm.control}
                    name='Percentage'
                    render={({field: {value, ...rest}}) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proficiency Level</FormLabel>
                        <div className="flex items-center">
                          <FormControl>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              className="w-full"
                              value={Number(value)}
                              {...rest}
                            />
                          </FormControl>
                          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-12">{Number(value)}%</span>
                        </div>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={subSkillForm.control}
                    name='Category'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            {...field}
                          >
                            <option value="">Select a category</option>
                            {skills.map(s => (
                              <option key={s.UniqueCode} value={s.UniqueCode}>{s.Title}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <button
                      type='submit'
                      disabled={subSkillForm.formState.isSubmitting}
                      className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
                    >
                      {subSkillForm.formState.isSubmitting 
                          ? <Loader2 className='mr-2 animate-spin'/> 
                          : <FaPlus className="mr-2" />
                      }
                      {subSkillForm.formState.isSubmitting 
                          ? "Adding..."
                          : "Add Skill"
                      }
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Skill Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Skill Categories</h2>
            
            {!skills.length && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No skill categories yet. Add your first category above.
              </div>
            )}
            {skills.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((item) => (
                  <CategoryWithSkillCard key={`skill-category-list-${item.UniqueCode}`} data={item}/>
                ))}
              </div>
            )}
          </div>

          {/* Technologies Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400 flex items-center">
              <FaLeaf className="mr-2" /> Technologies I Work With
            </h2>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {(editProfile?.Technologies || [])?.map((tech, index) => (
                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full pl-4 pr-2 py-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{tech}</span>
                  <button
                    aria-label='delete-technology'
                    onClick={() => handleDeleteTechnology(tech)}
                    className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
            
            <Form {...techForm}>
              <form onSubmit={handleSaveTechnology}>
                <FormField
                  control={techForm.control}
                  name='Name'
                  render={({field}) => (
                    <FormItem >
                      <div className="flex gap-3">
                        <FormControl>
                          <input
                            placeholder="Add new technology"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            {...field}
                          />   
                        </FormControl>
                        <button
                          type='submit'
                          disabled={techForm.formState.isSubmitting}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                        >
                          {techForm.formState.isSubmitting 
                              ? <Loader2 className='mr-1 animate-spin'/> 
                              : <FaPlus className="mr-1" />
                          }
                          {techForm.formState.isSubmitting 
                              ? "Adding..."
                              : "Add"
                          }
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};