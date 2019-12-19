const formData = {
  email: {
      type: 'email',
      label: 'Email',
      value: '',
      validations: ['required', 'email']
  },
  password: {
      type: 'password',
      label: 'Password',
      value: '',
      validations: ['required'],
  }
}

export default formData;