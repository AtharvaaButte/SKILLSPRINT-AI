import { Helmet } from 'react-helmet-async';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { LoginScreen } from '@/components/auth/LoginScreen';

function IndexContent() {
  const { user  } = useAuth();

  if (!user) { 
    return <LoginScreen />;
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SkillSprint AI - Personalized Career Roadmaps</title>
        <meta name="description" content="Generate and track personalized career preparation roadmaps using AI. Master new skills and land your dream job with SkillSprint AI." />
      </Helmet>
      <AuthProvider>
        <IndexContent />
      </AuthProvider>
    </>
  );
}; 

export default Index;
