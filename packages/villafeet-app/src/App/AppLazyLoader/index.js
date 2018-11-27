import lazy from '../../components/AsyncComponent';

export const LoginPage = lazy(() =>
  import(/* webpackChunkName: "loginPage" */ '../../pages/LoginPage').then(module => module.default)
)

export const PatientsPage = lazy(() =>
  import(/* webpackChunkName: "PatientsPage" */ '../../pages/PatientsPage').then(module => module.default)
)

export const PatientDetailsPage = lazy(() =>
  import(/* webpackChunkName: "PatientDetailsPage" */ '../../pages/PatientDetailsPage').then(module => module.default)
)

export const WorkInProgressPage = lazy(() =>
  import(/* webpackChunkName: "wipPage" */ '../../pages/WorkInProgressPage').then(module => module.default)
)

export const NotFoundPage = lazy(() =>
  import(/* webpackChunkName: "404Page" */ '../../pages/NotFoundPage').then(module => module.default)
)