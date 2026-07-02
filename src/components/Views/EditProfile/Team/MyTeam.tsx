// components/MyTeam.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLinkedin, FaTwitter, FaDribbble, FaGithub, FaMountain, FaTree, FaPlus, FaTrash, FaSave, FaTimes, FaEdit, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useAppSelector, useThemeMode } from '@/hooks';
import type { ITeam } from '@/types/data.types';
import { useForm } from 'react-hook-form';
import { teamMemberSchema, type TeamMemberSchemaFormDataInput, type TeamMemberSchemaFormDataOutput } from '@/schemas/teamMember.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TeamMember from './TeamMember';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSubmitBtnLoader } from '@/components/Common';
import ImageUpload from '@/components/Common/ImageUpload';

const socialPlatform = {
    'LinkedIn' : <FaLinkedin />,
    'Facebook' : <FaFacebook />,
    'Twitter' : <FaTwitter />,
    'Dribbble' : <FaDribbble />,
    'Github' : <FaGithub />,
    'Instagram' : <FaInstagram />,
} as const

type socialPlatFormMap = keyof typeof socialPlatform

export const teamMemberDefaultValues: TeamMemberSchemaFormDataOutput = {
  MemberName: "",
  Position: "",
  Experience: undefined,
  Bio: "",
  Skills: [],
  Image: null,
  Social: {
    Facebook: "",
    Twitter: "",
    LinkedIn: "",
    Instagram: "",
    Github: "",
  },
};


export default function MyTeam(){
  const {isDarkMode} = useThemeMode()
  const {editProfile} = useAppSelector(x => x.profile)
  

  // Initial team description
  const [teamDescription, setTeamDescription] = useState(
    "I'm proud to collaborate with a talented team of professionals who share my passion for " +
    "creating exceptional digital experiences. Together, we deliver innovative solutions that " +
    "exceed client expectations."
  );


  const form = useForm<TeamMemberSchemaFormDataInput, TeamMemberSchemaFormDataOutput>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: teamMemberDefaultValues,
  })

  const {control, handleSubmit, reset, formState: {isSubmitting}} = form;

  const onSubmit = handleSubmit(async (fData, e) => {
    e?.preventDefault();
    console.log("🚀 ~ MyTeam.tsx:62 ~ MyTeam ~ fData:", fData);

    // api call here

  }, (err) => {
    console.log("🚀 ~ TeamMember.tsx:43 ~ TeamMember ~ err:", err);
  })

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
  // const successBgClass = isDarkMode ? 'bg-green-900' : 'bg-green-100';
  // const successTextClass = isDarkMode ? 'text-green-200' : 'text-green-700';
  // const socialIconBgClass = isDarkMode ? 'bg-teal-900/30' : 'bg-teal-100';
  // const socialIconTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
  // const socialIconHoverClass = isDarkMode ? 'hover:bg-teal-800' : 'hover:bg-teal-200';

  const inputLabelClass = `block text-sm font-medium mb-1 ${textSecondaryClass}`;
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`;

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>My Team Editor</h1>
          <button
            // onClick={handleSave}
            // disabled={saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
          >
            {/* {saving ? (
              <>Saving...</>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )} */}
            <FaSave className="mr-2" /> Save Changes
          </button>
        </div>

        {/* Team Description Editor */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center ${tealTextClass}`}>
            <FaUsers className="mr-2" /> Team Description
          </h2>
          
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Enter team description"
          />
        </div>

        {/* Add New Team Member Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
            <FaPlus className="mr-2" /> Add New Team Member
          </h2>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={control}
                  name="Image"
                  render={({ field }) => (
                      <FormItem className="md:col-span-2">
                          <FormLabel>Profile Image</FormLabel>

                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>

                          <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                    control={control}
                    name='MemberName'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={inputLabelClass}>Name</FormLabel>
                            <FormControl>
                                <input
                                    className={inputClass}
                                    placeholder="Enter team member's name"
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
                                    placeholder="Enter position"
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
                        <FormItem className="md:col-span-2">
                            <FormLabel className={inputLabelClass}>Bio</FormLabel>
                            <FormControl>
                                <textarea
                                    className={inputClass}
                                    rows={3}
                                    placeholder="Enter bio"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>
              
              <div className="mb-6">
                <h3 className={`text-lg font-medium mb-3 ${textClass}`}>Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {
                      ((Object.entries(socialPlatform) ?? {}) as [socialPlatFormMap, any][]).map(([item, _], idx) => {
                          
                          return (
                              <FormField
                                  key={idx}
                                  control={control}
                                  name={`Social.${item}`}
                                  render={({field}) => (
                                      <FormItem>
                                          <FormLabel className={inputLabelClass}>{item}</FormLabel>
                                          <FormControl>
                                              <input
                                                  className={inputClass}
                                                  placeholder={`Enter ${item} URL`}
                                                  {...field}
                                              />
                                          </FormControl>
                                          <FormMessage/>
                                      </FormItem>
                                  )}
                              />
                          )
                      })
                  }
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                >
                  {isSubmitting ? <FormSubmitBtnLoader/> : <FaPlus className="mr-2" />}
                  {isSubmitting ? "Adding..." : "Add Team Member"}
                </button>
              </div>
            </form>
          </Form>
        </div>

        {/* Existing Team Members */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Team</h2>
          
          {editProfile?.Teams?.length === 0 && (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No team members yet. Add your first team member above.
            </div>
          )}
          
          {(editProfile?.Teams || [])?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editProfile?.Teams?.map((member) => (
                <TeamMember key={member.UniqueCode} data={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};