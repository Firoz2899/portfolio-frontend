import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage, useAlert } from '@/components/Common';
import { GROUPED_PROFESSION_ICONS, PROFESSION_ICON_MAP } from '@/data';
import { skillApiHooks, executeMutation } from '@/services';
import type { ISkill } from '@/types/data.types';
import { Briefcase, Loader2 } from 'lucide-react';
import { FaEdit, FaHiking, FaLeaf, FaMountain, FaSave, FaTimes, FaTrash, FaTree } from 'react-icons/fa';
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSkillSchema } from '@/schemas/skillSchema';

 // Icon options
  const iconOptions = [
    { type: "mountain", icon: <FaMountain className="text-3xl" /> },
    { type: "tree", icon: <FaTree className="text-3xl" /> },
    { type: "leaf", icon: <FaLeaf className="text-3xl" /> },
    { type: "hiking", icon: <FaHiking className="text-3xl" /> }
  ];

interface ICategoryWithSkillCard {
    data: ISkill;
}

export default function CategoryWithSkillCard({
    data
}: ICategoryWithSkillCard) {

    const [deleteSkillApi] = skillApiHooks.useDeleteSkillMutation()
    const [updateSkillApi] = skillApiHooks.useUpdateSkillMutation()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const {showConfirmation, showAlertMessage} = useAlert()
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)

    const form = useForm({
        resolver: zodResolver(updateSkillSchema),
        defaultValues: data,
    });

    const { control, handleSubmit, reset } = form;

    const { fields, remove } = useFieldArray({
        control,
        name: "Skills",
    });

    const titleVal = useWatch({control, name: "Title"})
    const iconVal = useWatch({control, name: "Icon"})

    useEffect(() => {
        reset({
            UniqueCode: data.UniqueCode,
            Title: data.Title,
            Icon: data.Icon,
            Skills: data.Skills,
        });
    }, [data, reset])

    const handleDeleteSkillCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        showConfirmation({
            title: `Are you sure, you want to delete "${data.Title}".`,
            onConfirm: async () => {
                setDeleteLoading(true)
                const res = await executeMutation(deleteSkillApi({uniqueCode: data.UniqueCode}).unwrap())
                showAlertMessage(res.IsSuccess, res.Message);
                setDeleteLoading(false)
            }
        })
    }

    const handleSaveSkill = handleSubmit(async (formData, e) => {
        e!.preventDefault();
        setSaveLoading(true)
        const res = await executeMutation(updateSkillApi(formData as ISkill).unwrap())
        showAlertMessage(res.IsSuccess, res.Message);
        setSaveLoading(false)
        
        if(res.IsSuccess)
            setIsEditMode(false)
    })

    const Icon = PROFESSION_ICON_MAP[iconVal] ?? Briefcase;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <Form {...form}>
                <form onSubmit={handleSaveSkill}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white">
                                <Icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {
                                isEditMode && (
                                    <button
                                        type='submit'
                                        aria-label='Skill save click'
                                        onClick={handleSaveSkill}
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        {saveLoading 
                                            ? <Loader2 className='animate-spin'/> 
                                            : <FaSave />}
                                    </button>
                                )
                            }
                            <button
                                type='button'
                                aria-label='Skill edit click'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if(isEditMode)
                                        reset(data)
                                    
                                    setIsEditMode(prev => !prev)
                                }}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {!isEditMode ? <FaEdit /> : <FaTimes/>}
                            </button>
                            <button
                                type='button'
                                aria-label='Delete category'
                                onClick={handleDeleteSkillCategory}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                {deleteLoading 
                                    ? <Loader2 className='animate-spin'/> 
                                    : <FaTrash />}
                            </button>
                        </div>
                    </div>

                    {isEditMode && (
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="Title"
                                render={({ field }) => (
                                    <FormItem>
                                            <FormControl>
                                                <input
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-3 dark:bg-gray-700 dark:text-white"
                                                />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Icon"
                                render={({ field }) => (
                                    <FormItem>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                >
                                                    {Object.entries(GROUPED_PROFESSION_ICONS)
                                                    .sort(([a], [b]) => a.localeCompare(b))
                                                    .map(([group, items]) => (
                                                        <optgroup
                                                            key={group}
                                                            label={group}
                                                        >
                                                            {items
                                                            .sort((a, b) => a.label.localeCompare(b.label))
                                                            .map((item) => (
                                                                <option
                                                                key={`${item.value}-card-field`}
                                                                value={item.value}
                                                                >
                                                                {item.label}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    {!isEditMode && (
                        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">{titleVal.trim()}</h3>
                    )}

                    <div className="space-y-4">
                        {
                            !fields.length && (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No skills in this category yet.</p>
                            )
                        }
                        {fields?.map((skill: any, index: any) => (
                            <div key={skill.UniqueCode}>
                                <div className="flex justify-between items-center mb-1 gap-2">
                                    {isEditMode && (
                                        <FormField
                                            control={form.control}
                                            name={`Skills.${index}.Name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                    <input
                                                        {...field}
                                                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )} 
                                    {!isEditMode && (
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.Name}</span>
                                    )}
                                    <div className="flex items-center">
                                        {isEditMode && (
                                            <FormField
                                                control={form.control}
                                                name={`Skills.${index}.Percentage`}
                                                render={({ field: {onChange, value, ...rest} }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                max={100}
                                                                value={Number(value)}
                                                                onChange={(e) =>
                                                                    onChange(Number(e.target.value))
                                                                }
                                                                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mr-2 dark:bg-gray-700 dark:text-white"
                                                                {...rest}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )} 
                                        {!isEditMode && (
                                            <span className="text-sm font-medium text-teal-600 dark:text-teal-400 mr-2">{Number(skill.Percentage)}%</span>
                                        )}
                                        {/* <button
                                            onClick={() => editingSkill === skill.UniqueCode ? setEditingSkill("") : setEditingSkill(skill.UniqueCode)}
                                            className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                                        >
                                            {editingSkill === skill.UniqueCode ? <FaTimes /> : <FaEdit size={12} />}
                                        </button> */}
                                        {
                                            isEditMode && (
                                                <button
                                                    aria-label='Skill delete'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        remove(index)
                                                    }}
                                                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full ml-1"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                                        style={{ width: `${Number(skill.Percentage)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </Form>
        </div>
    )
}
