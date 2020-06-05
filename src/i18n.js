import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';

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
        'User not found': 'User not found',
        Edit: 'Edit',
        Save: 'Save',
        Cancel: 'Cancel',
        'Change Display Name': 'Change Display Name',
        'My Profile': 'My Profile',
        'There are no hoaxes': 'There are no hoaxes',
        'Load old hoaxes': 'Load old hoaxes',
        'There are new hoaxes': 'There are new hoaxes'
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
        'User not found': 'Kullanıcı bulunamadı',
        Edit: 'Düzenle',
        Save: 'Kaydet',
        Cancel: 'İptal',
        'Change Display Name': 'Görünür İsminizi Değiştirin',
        'My Profile': 'Profilim',
        'There are no hoaxes': 'Hiç hoax yok',
        'Load old hoaxes': 'Geçmiş hoaxları getir',
        'There are new hoaxes': 'Yeni hoaxları getir'
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


export const timeagetr = (number, index) => {
  return [
    ['az önce', 'şimdi'],
    ['%s saniye önce', '%s saniye içinde'],
    ['1 dakika önce', '1 dakika içinde'],
    ['%s dakika önce', '%s dakika içinde'],
    ['1 saat önce', '1 saat içinde'],
    ['%s saat önce', '%s saat içinde'],
    ['1 gün önce', '1 gün içinde'],
    ['%s gün önce', '%s gün içinde'],
    ['1 hafta önce', '1 hafta içinde'],
    ['%s hafta önce', '%s hafta içinde'],
    ['1 ay önce', '1 ay içinde'],
    ['%s ay önce', '%s ay içinde'],
    ['1 yıl önce', '1 yıl içinde'],
    ['%s yıl önce', '%s yıl içinde'],
  ][index];
};

register('tr', timeagetr);

export default i18n;