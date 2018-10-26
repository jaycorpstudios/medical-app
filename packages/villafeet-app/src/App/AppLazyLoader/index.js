import lazy from '../../components/AsyncComponent';

export const LoginPage = lazy(() =>
  import('../../pages/LoginPage').then(module => module.default)
)

export const ProfilePage = lazy(() =>
  import('../../pages/ProfilePage').then(module => module.default)
)