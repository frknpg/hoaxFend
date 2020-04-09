import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        Login: 'Login',
        Logout: 'Logout',
        Users: 'Users',
        Next: 'Next >',
        Prev: '< Previous',
        'Load Failure': 'Load Failure',
        'User not found': 'User not found'
      }
    },
    tr: {
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch': 'Şifreler uyuşmuyor',
        Username: 'Kullanıcı adı',
        'Display Name': 'Tercih Edilen İsim',
        Password: 'Şifre',
        'Password Repeat': 'Şifreyi Tekrarla',
        'Login': 'Giriş Yap',
        Logout: 'Çıkış Yap',
        Users: 'Kullanıcılar',
        Next: 'Sonraki >',
        Prev: '< Önceki',
        'Load Failure': 'Yükleme Hatası',
        'User not found': 'Kullanıcı bulunamadı'
      }
    }
  },
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;