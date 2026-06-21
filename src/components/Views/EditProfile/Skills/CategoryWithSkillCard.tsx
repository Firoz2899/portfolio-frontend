import { useAppActions, useAppSelector } from '@/hooks';
import type { ISkill, ISubSkill } from '@/types/data.types';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaHiking, FaLeaf, FaMountain, FaSave, FaTimes, FaTrash, FaTree } from 'react-icons/fa';

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

    const {profile} = useAppActions()
    const {setHasUpdatedAnyField} = profile
    const [isUpdtedAnyField, setIsUpdtedAnyField] = useState<boolean>(false)
    const [skillData, setSkillData] = useState<ISkill>(data)
    const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false)
    const [editingSkill, setEditingSkill] = useState<string>("")


    useEffect(() => {
        setSkillData(data)
    }, [data])

    const handleDeleteSkillCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const handleSaveSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <div key={skillData.UniqueCode} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white">
                        {skillData.Icon}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {
                        isEditingCategory && (
                            <button
                                aria-label='Skill save click'
                                onClick={handleSaveSkill}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <FaSave />
                            </button>
                        )
                    }
                    <button
                        aria-label='Skill edit click'
                        onClick={() => setIsEditingCategory(prev => !prev)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {isEditingCategory ? <FaEdit /> : <FaTimes/>}
                    </button>
                    <button
                        aria-label='Delete category'
                        onClick={handleDeleteSkillCategory}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {isEditingCategory ? (
                <div className="mb-4">
                    <input
                        aria-label='Skill category title'
                        type="text"
                        value={skillData.Title}
                        onChange={(e) => setSkillData(prev => ({...prev, Title: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-3 dark:bg-gray-700 dark:text-white"
                    />
                    <select
                        aria-label='Skill Category icon'
                        value={iconOptions.find(opt => opt.type === skillData.Icon)?.type || "mountain"}
                        onChange={(e) => setSkillData(prev => ({...prev, Icon: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        <option value="mountain">Mountain</option>
                        <option value="tree">Tree</option>
                        <option value="leaf">Leaf</option>
                        <option value="hiking">Hiking</option>
                    </select>
                </div>
            ) : (
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">{skillData.Title.trim()}</h3>
            )}

            <div className="space-y-4">
                {
                    !skillData.Skills.length && (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No skills in this category yet.</p>
                    )
                }
                {skillData.Skills?.map((skill: ISubSkill) => (
                        <div key={skill.UniqueCode}>
                            <div className="flex justify-between items-center mb-1">
                                {editingSkill === skill.UniqueCode && (
                                    <input
                                        aria-label='Skill name'
                                        type="text"
                                        value={skill.Name}
                                        onChange={(e) => setSkillData(prev => ({
                                            ...prev, 
                                            Skills: prev.Skills.map(s =>
                                                s.UniqueCode === skill.UniqueCode
                                                    ? {...s, Name: e.target.value}
                                                    : s
                                            )
                                        }))}
                                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                )} 
                                {editingSkill != skill.UniqueCode && (
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{skill.Name}</span>
                                )}
                                <div className="flex items-center">
                                    {editingSkill === skill.UniqueCode && (
                                        <input
                                            aria-label='Skill percentage'
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={skill.Percentage}
                                            onChange={(e) => setSkillData(prev => ({
                                                ...prev, 
                                                Skills: prev.Skills.map(s =>
                                                    s.UniqueCode === skill.UniqueCode
                                                        ? {...s, Percentage: parseInt(e.target.value) || 0}
                                                        : s
                                                )
                                            }))}
                                            className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mr-2 dark:bg-gray-700 dark:text-white"
                                        />
                                    )} 
                                    {editingSkill != skill.UniqueCode && (
                                        <span className="text-sm font-medium text-teal-600 dark:text-teal-400 mr-2">{skill.Percentage}%</span>
                                    )}
                                    <button
                                        onClick={() => editingSkill === skill.UniqueCode ? setEditingSkill("") : setEditingSkill(skill.UniqueCode)}
                                        className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                                    >
                                        {editingSkill === skill.UniqueCode ? <FaTimes /> : <FaEdit size={12} />}
                                    </button>
                                    <button
                                        aria-label='Skill delete'
                                        onClick={() => setSkillData(prev => ({
                                            ...prev,
                                            Skills: prev.Skills.filter(s => 
                                                s.UniqueCode !== skill.UniqueCode
                                            )
                                        }))}
                                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full ml-1"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                                    style={{ width: `${skill.Percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
