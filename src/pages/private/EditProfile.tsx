import { profileApiHooks } from '@/services';
import { useAppSelector } from '@/hooks';
import { Loader } from '@/components/Common/Loader';
import AdminLayout from '@/components/Layout/AdminLayout';
import { navigationItems } from '@/tempData/NavigationItems';


export default function EditProfile() {
  profileApiHooks.useGetUserProfileQuery();
  const {activeTab} = useAppSelector(x => x.app)
  const {editProfile, isLoading} = useAppSelector(x => x.profile)

  // only first time loading will show
  if(isLoading && !editProfile){
    return <Loader/>
  }

  const ActiveComp = navigationItems.find(x => x.id === activeTab)?.component;
  
  if(!ActiveComp){
    return <AdminLayout />
  }

  return (
    <AdminLayout>
      <ActiveComp/>
    </AdminLayout>
  );
}
