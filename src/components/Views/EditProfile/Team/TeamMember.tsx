import React, { useState } from 'react'
import { FaDribbble, FaEdit, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaSave, FaTimes, FaTrash, FaTwitter } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormMessage, FormSubmitBtnLoader, useAlert, FormLabel, Form } from '@/components/Common';
import { useThemeMode } from '@/hooks';
import type { ITeam } from '@/types/data.types';
import { useForm } from 'react-hook-form';
import { teamMemberSchema, type TeamMemberSchemaFormDataInput, type TeamMemberSchemaFormDataOutput } from '@/schemas/teamMember.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const socialPlatform = {
    'LinkedIn' : <FaLinkedin />,
    'Facebook' : <FaFacebook />,
    'Twitter' : <FaTwitter />,
    'Dribbble' : <FaDribbble />,
    'Github' : <FaGithub />,
    'Instagram' : <FaInstagram />,
} as const

type socialPlatFormMap = keyof typeof socialPlatform

interface ITeamMember {
    data: ITeam
}

export default function TeamMember({
    data
}: ITeamMember) {
    const {isDarkMode} = useThemeMode()
    const {showConfirmation} = useAlert()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<TeamMemberSchemaFormDataInput, TeamMemberSchemaFormDataOutput>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: data,
    })

    const {control, handleSubmit, setValue, reset, formState: {isSubmitting}} = form;

    const onSubmit = handleSubmit(async (fData, e) => {
        e?.preventDefault();

        // api call here

    }, (err) => {
        console.log("🚀 ~ TeamMember.tsx:43 ~ TeamMember ~ err:", err);
    })

    const deleteTeamMember = () => {
        showConfirmation({
            title: `Are you sure to delete "${data.MemberName}"?`,
            onConfirm: async () => {
                setIsLoading(true)
                // api call here
                setIsLoading(false)
            }
        })
    }
    
    // Theme classes
    const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
    const textSecondaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const textMutedClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
    const inputBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
    const tealTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
    const socialIconBgClass = isDarkMode ? 'bg-teal-900/30' : 'bg-teal-100';
    const socialIconTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
    const socialIconHoverClass = isDarkMode ? 'hover:bg-teal-800' : 'hover:bg-teal-200';

    const inputLabelClass = `block text-sm font-medium mb-1 ${textSecondaryClass}`;
    const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`;

    
    
    return (
        <div key={data.UniqueCode} className={`rounded-2xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>

            {isEditMode && (
                // Edit Mode
                <div className="p-6">
                    <Form {...form}>
                        <form onSubmit={onSubmit}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-lg font-semibold ${textClass}`}>Editing Team Member</h3>
                                <div className="flex space-x-2">
                                    <button
                                        aria-label='Submit form'
                                        type='submit'
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        {isSubmitting ? <FormSubmitBtnLoader/> : <FaSave />}
                                    </button>
                                    <button
                                        aria-label='cancel editing'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            reset(data)
                                        }}
                                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={control}
                                    name='MemberName'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={inputLabelClass}>Name</FormLabel>
                                            <FormControl>
                                                <input
                                                    className={inputClass}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='Position'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={inputLabelClass}>Position</FormLabel>
                                            <FormControl>
                                                <input
                                                    className={inputClass}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='Bio'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={inputLabelClass}>Bio</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    className={inputClass}
                                                    rows={3}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name='Bio'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={inputLabelClass}>Image URL</FormLabel>
                                            <FormControl>
                                                <input
                                                    className={inputClass}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <h4 className={`text-md font-medium mb-2 ${textClass}`}>Social Media Links</h4>
                                    <div className="space-y-2">
                                        {
                                            ((Object.entries(socialPlatform) ?? {}) as [socialPlatFormMap, any][]).map(([item, _], idx) => {
                                                
                                                return (
                                                    <FormField
                                                        key={idx}
                                                        control={control}
                                                        name={`Social.${item}`}
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel className={`block text-xs mb-1 ${textMutedClass}`}>{item}</FormLabel>
                                                                <FormControl>
                                                                    <input
                                                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            )}

            {!isEditMode && (
                // View Mode
                <div className="group">
                    {/* Top accent bar */}
                    <div className="h-2 bg-gradient-to-r from-teal-500 to-blue-600"></div>

                    <div className="p-6 pt-10 -mt-6">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <img
                                    src={data.Image ? data.Image.ThumbnailUrl : ""}
                                    alt={data.MemberName}
                                    className="w-full h-full object-cover"
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(data.MemberName)}`;
                                    }}
                                />
                            </div>

                            {/* Edit and delete buttons */}
                            <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    aria-label='Edit Team'
                                    onClick={() => {
                                        setIsEditMode(true)
                                        reset(data)
                                    }}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    aria-label='Delete Team'
                                    onClick={deleteTeamMember}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    {isLoading ? <Loader2 className='animate-spin'/> : <FaTrash />}
                                </button>
                            </div>
                        </div>

                        {/* Team member info */}
                        <div className="text-center mb-4">
                            <h3 className={`text-xl font-bold mb-1 ${textClass}`}>{data.MemberName}</h3>
                            <p className={tealTextClass}>{data.Position}</p>
                        </div>

                        {/* Bio */}
                        <p className={`text-center mb-6 ${textSecondaryClass}`}>
                            {data.Bio}
                        </p>

                        {/* Social links */}
                        <div className="flex justify-center space-x-3">
                            {(Object.entries(data?.Social ?? {}) as [socialPlatFormMap, string][])?.map(([platform, url]) => (
                                url && (
                                    <Link
                                        key={platform}
                                        to={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${socialIconBgClass} ${socialIconTextClass} ${socialIconHoverClass}`}
                                    >
                                        {socialPlatform[platform]}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
