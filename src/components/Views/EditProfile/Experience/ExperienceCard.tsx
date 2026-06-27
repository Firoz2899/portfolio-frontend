import { useAlert } from '@/components/Common';
import { DATE_FORMATS } from '@/constants';
import { useThemeMode } from '@/hooks';
import { executeMutation, experienceApiHooks } from '@/services';
import type { IExperience } from '@/types/data.types';
import { formatDate } from '@/utils/basic-helpers';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FaBuilding, FaCalendarAlt, FaEdit, FaGlobe, FaMapMarkerAlt, FaPhone, FaTrash, FaTrophy } from 'react-icons/fa'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface IExperienceCardProps {
    data: IExperience;
    onEdit: () => void;
}

export default function ExperienceCard({
    data,
    onEdit
}: IExperienceCardProps) {

    const MySwal = withReactContent(Swal);
    const {showAlertMessage, showConfirmation} = useAlert()
    const {isDarkMode} = useThemeMode()
    const [deleteExperience] = experienceApiHooks.useDeleteExperienceMutation()
    const [loading, setLoading] = useState<boolean>(false)

    const handleDeleteClick = async () => {
        // showConfirmation({
        //     title: 'Are you sure? "This will permanently delete this experience.',
        //     confirmLabel: 'Yes, delete it!',
        //     cancelLabel: 'No, keep it',
        //     onConfirm: async () => {
        //         setLoading(true)
        //         const res = await executeMutation(deleteExperience({UniqueCode: data.UniqueCode!}).unwrap());
        //         showAlertMessage(res.IsSuccess, res.Message)
        //         setLoading(false)
        //     }
        // })
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete this experience.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            setLoading(true)
            const res = await executeMutation(deleteExperience({UniqueCode: data.UniqueCode!}).unwrap());
            showAlertMessage(res.IsSuccess, res.Message)
            setLoading(false)
        }
    };

    // Theme classes
    const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
    const textSecondaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const textMutedClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const tealTextClass = isDarkMode ? 'text-teal-400' : 'text-teal-600';
    const redHoverClass = isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';
    const greenHoverClass = isDarkMode ? 'hover:bg-green-900/30' : 'hover:bg-green-50';
    
    return (
        <div key={data.UniqueCode} className={`rounded-xl p-5 border shadow-sm ${cardBgClass} ${borderClass}`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-semibold ${textClass}`}>{data.Position}</h3>
                <div className='flex justify-end  space-x-2'>
                    {/* <button
                        onClick={onEdit}
                        className={`p-2 rounded-full ${textMutedClass} ${greenHoverClass} transition-colors`}
                        title="Edit Experience"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className={`p-2 rounded-full ${textMutedClass} ${redHoverClass} transition-colors`}
                        title="Delete Experience"
                    >
                        {loading ? <Loader2 className='animate-spin' /> : <FaTrash />}
                    </button> */}
                    <button
                        type='button'
                        aria-label='Experience edit click'
                        onClick={onEdit}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <FaEdit />
                    </button>
                    <button
                        type='button'
                        aria-label='Delete Experience'
                        onClick={handleDeleteClick}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        {loading 
                            ? <Loader2 className='animate-spin'/> 
                            : <FaTrash />}
                    </button>
                </div>

            </div>

            <div className="mb-3">
                <p className={`flex items-center ${textSecondaryClass}`}>
                    <FaBuilding className="mr-2" /> {data.Company}
                </p>
                <p className={`flex items-center mt-1 ${textMutedClass}`}>
                    <FaMapMarkerAlt className="mr-2" /> {[
                        data.Address?.City,
                        data.Address?.State?.Name,
                        data.Address?.Country?.Name
                    ].filter(Boolean).join(", ")}
                </p>
            </div>

            <div className="mb-3">
                <p className={`flex items-center ${textSecondaryClass}`}>
                    <FaCalendarAlt className="mr-2" />
                    {formatDate({
                        date: data.StartDate,
                        formatString: DATE_FORMATS.MONTH_YEAR
                    })} - {formatDate({
                        date: data?.EndDate,
                        formatString: DATE_FORMATS.MONTH_YEAR,
                        defaultValue: 'Present'
                    })}
                </p>
                {data.Phone && (
                    <p className={`flex items-center mt-1 ${textMutedClass}`}>
                        <FaPhone className="mr-2" /> {data.Phone}
                    </p>
                )}
                {data.Website && (
                    <p className={`flex items-center mt-1 ${textMutedClass}`}>
                        <FaGlobe className="mr-2" />
                        <a href={data.Website} target="_blank" rel="noopener noreferrer" className={tealTextClass}>
                            {data.Website}
                        </a>
                    </p>
                )}
            </div>

            {data.Description && (
                <p className={`mb-3 ${textSecondaryClass}`}>{data.Description}</p>
            )}

            {data.Achievements && data.Achievements.length > 0 && (
                <div>
                    <h4 className={`text-sm font-medium mb-2 flex items-center ${textSecondaryClass}`}>
                        <FaTrophy className="mr-2" /> Key Achievements
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {data.Achievements.map((achievement, index) => (
                            <li key={`${achievement}-${data.UniqueCode}-${index}`} className={`${textMutedClass} text-sm`}>{achievement}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
