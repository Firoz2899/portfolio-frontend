import { useRef } from 'react'
import { motion } from 'framer-motion';
import { useHover } from 'usehooks-ts';
import { cn } from '@/utils';
import { useAppActions, useAppSelector } from '@/hooks';
import type { INavigationItem } from '@/types/constants.types';

export function NavigationSidebarItem({item}: {item: INavigationItem}) {
    const {activeTab} = useAppSelector(x => x.app)
    const {setActiveTab, setSidebarOpen} = useAppActions()
    const eleRef = useRef<HTMLButtonElement>(null!);
    const isHovered = useHover<HTMLButtonElement>(eleRef)
  return (
    <motion.button
        ref={eleRef}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
            setActiveTab(item.id);
            setSidebarOpen(false);
        }}
        onMouseOver={() => item?.component?.preload()}
        onMouseEnter={() => item?.component?.preload()}
        className={cn(
            "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all relative overflow-hidden",
            {
                [`bg-gradient-to-r ${item.color} text-white shadow-lg`]: activeTab === item.id,
                'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50': activeTab !== item.id
            }
        )}
    >
        {/* Animated background for active item */}
        {activeTab === item.id && (
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        )}

        <span className="mr-3 text-lg z-10">{item.icon}</span>
        <div className="text-left z-10">
            <div>{item.name}</div>
            <div className="text-xs opacity-70">{item.description}</div>
        </div>

        {/* Hover effect */}
        {isHovered && activeTab !== item.id && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-auto w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 z-10"
            />
        )}
    </motion.button>
  )
}
