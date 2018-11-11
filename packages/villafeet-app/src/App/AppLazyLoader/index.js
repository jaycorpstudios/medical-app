import lazy from '../../components/AsyncComponent';

export const LoginPage = lazy(() =>
  import('../../pages/LoginPage').then(module => module.default)
)

export const PatientsPage = lazy(() =>
  import('../../pages/PatientsPage').then(module => module.default)
)

export const WorkInProgressPage = lazy(() =>
  import('../../pages/WorkInProgressPage').then(module => module.default)
)

export const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage').then(module => module.default)
)