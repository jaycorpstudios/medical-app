import lazy from '../../components/AsyncComponent';

export const LoginPage = lazy(() =>
  import('../../pages/LoginPage').then(module => module.default)
)

export const PatientsPage = lazy(() =>
  import('../../pages/PatientsPage').then(module => module.default)
)