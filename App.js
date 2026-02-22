import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

export default function App() {
  // Languages - all properly quoted
  const languages = [
    { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { id: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { id: 'ko', name: 'Korean', flag: '🇰🇷' },
    { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { id: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳' },
    { id: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { id: 'sa', name: 'Sanskrit', flag: '🕉️' },
    { id: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { id: 'es', name: 'Spanish', flag: '🇪🇸' },
    { id: 'fr', name: 'French', flag: '🇫🇷' },
  ];

  // Vocabulary - 30+ words per language (transliterated)
  const vocabulary = {
    ar: [
      { en: 'Hello', tr: 'Marhaba', ph: 'Mar-ha-ba' },
      { en: 'Thank you', tr: 'Shukran', ph: 'Shuk-ran' },
      { en: 'Yes', tr: 'Naam', ph: 'Na-am' },
      { en: 'No', tr: 'La', ph: 'La' },
      { en: 'Please', tr: 'Min fadlik', ph: 'Min fad-lik' },
      { en: 'Water', tr: 'Maa', ph: 'Maa' },
      { en: 'Food', tr: 'Taam', ph: 'Ta-am' },
      { en: 'Friend', tr: 'Sadeeq', ph: 'Sa-deeq' },
      { en: 'Good', tr: 'Jayyid', ph: 'Jay-yid' },
      { en: 'Love', tr: 'Hubb', ph: 'Hubb' },
      { en: 'Peace', tr: 'Salaam', ph: 'Sa-laam' },
      { en: 'Book', tr: 'Kitaab', ph: 'Ki-taab' },
      { en: 'House', tr: 'Bayt', ph: 'Bayt' },
      { en: 'Family', tr: 'Aaila', ph: 'Aa-i-la' },
      { en: 'Sun', tr: 'Shams', ph: 'Shams' },
      { en: 'Moon', tr: 'Qamar', ph: 'Qa-mar' },
      { en: 'Beautiful', tr: 'Jameel', ph: 'Ja-meel' },
      { en: 'Mother', tr: 'Umm', ph: 'Umm' },
      { en: 'Father', tr: 'Ab', ph: 'Ab' },
      { en: 'Wife', tr: 'Zawja', ph: 'Zaw-ja' },
      { en: 'Husband', tr: 'Zawj', ph: 'Zawj' },
      { en: 'School', tr: 'Madrasa', ph: 'Mad-ra-sa' },
      { en: 'City', tr: 'Madina', ph: 'Ma-dee-na' },
      { en: 'Night', tr: 'Layl', ph: 'Layl' },
      { en: 'Day', tr: 'Yawm', ph: 'Yawm' },
      { en: 'Big', tr: 'Kabeer', ph: 'Ka-beer' },
      { en: 'Small', tr: 'Sagheer', ph: 'Sa-gheer' },
      { en: 'Hot', tr: 'Haar', ph: 'Haar' },
      { en: 'Cold', tr: 'Baarid', ph: 'Baa-rid' },
      { en: 'Money', tr: 'Maal', ph: 'Maal' },
      { en: 'Car', tr: 'Sayyara', ph: 'Say-ya-ra' },
      { en: 'Road', tr: 'Tareeq', ph: 'Ta-reeq' },
      { en: 'Child', tr: 'Tifl', ph: 'Tifl' },
      { en: 'Student', tr: 'Taalib', ph: 'Taa-lib' },
    ],
    bn: [
      { en: 'Hello', tr: 'Nomoskar', ph: 'No-mos-kar' },
      { en: 'Thank you', tr: 'Dhonnobad', ph: 'Dhon-no-baad' },
      { en: 'Yes', tr: 'Hya', ph: 'Hya' },
      { en: 'No', tr: 'Na', ph: 'Na' },
      { en: 'Please', tr: 'Doya kore', ph: 'Do-ya ko-re' },
      { en: 'Water', tr: 'Pani', ph: 'Pa-ni' },
      { en: 'Food', tr: 'Khabar', ph: 'Kha-bar' },
      { en: 'Friend', tr: 'Bondhu', ph: 'Bon-dhu' },
      { en: 'Good', tr: 'Bhalo', ph: 'Bha-lo' },
      { en: 'Love', tr: 'Bhalobasha', ph: 'Bha-lo-ba-sha' },
      { en: 'Mother', tr: 'Ma', ph: 'Ma' },
      { en: 'Father', tr: 'Baba', ph: 'Ba-ba' },
      { en: 'Wife', tr: 'Stri', ph: 'Stree' },
      { en: 'Husband', tr: 'Swami', ph: 'Swa-mee' },
      { en: 'Home', tr: 'Bari', ph: 'Ba-ree' },
      { en: 'Book', tr: 'Boi', ph: 'Boy' },
      { en: 'School', tr: 'School', ph: 'School' },
      { en: 'Sun', tr: 'Surjo', ph: 'Sur-jo' },
      { en: 'Beautiful', tr: 'Shundor', ph: 'Shun-dor' },
      { en: 'Happy', tr: 'Khushi', ph: 'Khu-shee' },
      { en: 'Family', tr: 'Poribar', ph: 'Po-ri-bar' },
      { en: 'Work', tr: 'Kaaj', ph: 'Kaaj' },
      { en: 'Time', tr: 'Shomoy', ph: 'Sho-moy' },
      { en: 'City', tr: 'Shohor', ph: 'Sho-hor' },
      { en: 'Night', tr: 'Raat', ph: 'Raat' },
      { en: 'Day', tr: 'Din', ph: 'Din' },
      { en: 'Big', tr: 'Boro', ph: 'Bo-ro' },
      { en: 'Small', tr: 'Chhoto', ph: 'Chho-to' },
      { en: 'Hot', tr: 'Gorom', ph: 'Go-rom' },
      { en: 'Cold', tr: 'Thanda', ph: 'Than-da' },
      { en: 'Money', tr: 'Taka', ph: 'Ta-ka' },
      { en: 'Car', tr: 'Gari', ph: 'Ga-ree' },
      { en: 'Road', tr: 'Rasta', ph: 'Ras-ta' },
      { en: 'Child', tr: 'Shishu', ph: 'Shee-shu' },
    ],
    ko: [
      { en: 'Hello', tr: 'Annyeonghaseyo', ph: 'An-nyeong-ha-se-yo' },
      { en: 'Thank you', tr: 'Gamsahamnida', ph: 'Gam-sa-ham-ni-da' },
      { en: 'Yes', tr: 'Ne', ph: 'Ne' },
      { en: 'No', tr: 'Aniyo', ph: 'A-ni-yo' },
      { en: 'Please', tr: 'Jebal', ph: 'Je-bal' },
      { en: 'Water', tr: 'Mul', ph: 'Mul' },
      { en: 'Food', tr: 'Eumsik', ph: 'Eum-sik' },
      { en: 'Friend', tr: 'Chingu', ph: 'Chin-gu' },
      { en: 'Good', tr: 'Jota', ph: 'Jo-ta' },
      { en: 'Love', tr: 'Sarang', ph: 'Sa-rang' },
      { en: 'House', tr: 'Jip', ph: 'Jip' },
      { en: 'Book', tr: 'Chaek', ph: 'Chaek' },
      { en: 'School', tr: 'Hakgyo', ph: 'Hak-gyo' },
      { en: 'Mother', tr: 'Eomeoni', ph: 'Eo-meo-ni' },
      { en: 'Father', tr: 'Abeoji', ph: 'A-beo-ji' },
      { en: 'Wife', tr: 'Anae', ph: 'A-nae' },
      { en: 'Husband', tr: 'Nampyeon', ph: 'Nam-pyeon' },
      { en: 'Beautiful', tr: 'Areumdapda', ph: 'A-reum-dap-da' },
      { en: 'Happy', tr: 'Haengbokhada', ph: 'Haeng-bok-ha-da' },
      { en: 'Family', tr: 'Gajok', ph: 'Ga-jok' },
      { en: 'Work', tr: 'Il', ph: 'Il' },
      { en: 'Time', tr: 'Sigan', ph: 'Si-gan' },
      { en: 'City', tr: 'Dosi', ph: 'Do-si' },
      { en: 'Night', tr: 'Bam', ph: 'Bam' },
      { en: 'Day', tr: 'Nat', ph: 'Nat' },
      { en: 'Big', tr: 'Keuda', ph: 'Keu-da' },
      { en: 'Small', tr: 'Jakda', ph: 'Jak-da' },
      { en: 'Hot', tr: 'Tteugeopda', ph: 'Tteu-geop-da' },
      { en: 'Cold', tr: 'Chupda', ph: 'Chup-da' },
      { en: 'Money', tr: 'Don', ph: 'Don' },
      { en: 'Car', tr: 'Jadongcha', ph: 'Ja-dong-cha' },
      { en: 'Road', tr: 'Doro', ph: 'Do-ro' },
      { en: 'Child', tr: 'Ai', ph: 'Ai' },
    ],
    ja: [
      { en: 'Hello', tr: 'Konnichiwa', ph: 'Kon-ni-chi-wa' },
      { en: 'Thank you', tr: 'Arigatou', ph: 'A-ri-ga-to' },
      { en: 'Yes', tr: 'Hai', ph: 'Hai' },
      { en: 'No', tr: 'Iie', ph: 'I-i-e' },
      { en: 'Please', tr: 'Onegaishimasu', ph: 'O-ne-gai-shi-mas' },
      { en: 'Water', tr: 'Mizu', ph: 'Mi-zu' },
      { en: 'Food', tr: 'Tabemono', ph: 'Ta-be-mo-no' },
      { en: 'Friend', tr: 'Tomodachi', ph: 'To-mo-da-chi' },
      { en: 'Good', tr: 'Yoi', ph: 'Yo-i' },
      { en: 'Love', tr: 'Ai', ph: 'Ai' },
      { en: 'House', tr: 'Ie', ph: 'I-e' },
      { en: 'Book', tr: 'Hon', ph: 'Hon' },
      { en: 'School', tr: 'Gakkou', ph: 'Gak-kou' },
      { en: 'Mother', tr: 'Haha', ph: 'Ha-ha' },
      { en: 'Father', tr: 'Chichi', ph: 'Chi-chi' },
      { en: 'Wife', tr: 'Tsuma', ph: 'Tsu-ma' },
      { en: 'Husband', tr: 'Otto', ph: 'Ot-to' },
      { en: 'Beautiful', tr: 'Utsukushii', ph: 'Ut-su-ku-shii' },
      { en: 'Happy', tr: 'Shiawase', ph: 'Shi-a-wa-se' },
      { en: 'Family', tr: 'Kazoku', ph: 'Ka-zo-ku' },
      { en: 'Work', tr: 'Shigoto', ph: 'Shi-go-to' },
      { en: 'Time', tr: 'Jikan', ph: 'Ji-kan' },
      { en: 'City', tr: 'Toshi', ph: 'To-shi' },
      { en: 'Night', tr: 'Yoru', ph: 'Yo-ru' },
      { en: 'Day', tr: 'Hi', ph: 'Hi' },
      { en: 'Big', tr: 'Ookii', ph: 'Ō-kii' },
      { en: 'Small', tr: 'Chiisai', ph: 'Chii-sai' },
      { en: 'Hot', tr: 'Atsui', ph: 'At-sui' },
      { en: 'Cold', tr: 'Samui', ph: 'Sa-mui' },
      { en: 'Money', tr: 'Okane', ph: 'O-ka-ne' },
      { en: 'Car', tr: 'Kuruma', ph: 'Ku-ru-ma' },
      { en: 'Road', tr: 'Michi', ph: 'Mi-chi' },
      { en: 'Child', tr: 'Kodomo', ph: 'Ko-do-mo' },
    ],
    zh: [
      { en: 'Hello', tr: 'Ni hao', ph: 'Nee how' },
      { en: 'Thank you', tr: 'Xie xie', ph: 'Shyeh shyeh' },
      { en: 'Yes', tr: 'Shi', ph: 'Shrr' },
      { en: 'No', tr: 'Bu shi', ph: 'Boo shrr' },
      { en: 'Please', tr: 'Qing', ph: 'Ching' },
      { en: 'Water', tr: 'Shui', ph: 'Shway' },
      { en: 'Food', tr: 'Shiwu', ph: 'Shee-woo' },
      { en: 'Friend', tr: 'Pengyou', ph: 'Pung-yo' },
      { en: 'Good', tr: 'Hao', ph: 'How' },
      { en: 'Love', tr: 'Ai', ph: 'Eye' },
      { en: 'House', tr: 'Fangzi', ph: 'Fung-dzuh' },
      { en: 'Book', tr: 'Shu', ph: 'Shoo' },
      { en: 'School', tr: 'Xuexiao', ph: 'Shweh-shyao' },
      { en: 'Mother', tr: 'Mama', ph: 'Ma-ma' },
      { en: 'Father', tr: 'Baba', ph: 'Ba-ba' },
      { en: 'Wife', tr: 'Qizi', ph: 'Chee-dzuh' },
      { en: 'Husband', tr: 'Zhangfu', ph: 'Jang-foo' },
      { en: 'Beautiful', tr: 'Meili', ph: 'May-lee' },
      { en: 'Happy', tr: 'Kaixin', ph: 'Kai-sheen' },
      { en: 'Family', tr: 'Jiating', ph: 'Jya-ting' },
      { en: 'Work', tr: 'Gongzuo', ph: 'Gong-zwo' },
      { en: 'Time', tr: 'Shijian', ph: 'Shee-jyen' },
      { en: 'City', tr: 'Chengshi', ph: 'Chung-shee' },
      { en: 'Night', tr: 'Wanshang', ph: 'Wan-shang' },
      { en: 'Day', tr: 'Baitian', ph: 'Bye-tyen' },
      { en: 'Big', tr: 'Da', ph: 'Da' },
      { en: 'Small', tr: 'Xiao', ph: 'Shyao' },
      { en: 'Hot', tr: 'Re', ph: 'Ruh' },
      { en: 'Cold', tr: 'Leng', ph: 'Lung' },
      { en: 'Money', tr: 'Qian', ph: 'Chyen' },
      { en: 'Car', tr: 'Che', ph: 'Chuh' },
      { en: 'Road', tr: 'Lu', ph: 'Loo' },
      { en: 'Child', tr: 'Haizi', ph: 'Hi-dzuh' },
    ],
    ur: [
      { en: 'Hello', tr: 'Assalamualaikum', ph: 'As-sa-la-mu a-lai-kum' },
      { en: 'Thank you', tr: 'Shukriya', ph: 'Shuk-ree-ya' },
      { en: 'Yes', tr: 'Ji haan', ph: 'Jee haan' },
      { en: 'No', tr: 'Nahi', ph: 'Na-hee' },
      { en: 'Please', tr: 'Barae karam', ph: 'Ba-ra-e ka-ram' },
      { en: 'Water', tr: 'Pani', ph: 'Pa-nee' },
      { en: 'Food', tr: 'Khana', ph: 'Kha-na' },
      { en: 'Friend', tr: 'Dost', ph: 'Dost' },
      { en: 'Good', tr: 'Achha', ph: 'Ach-ha' },
      { en: 'Love', tr: 'Mohabbat', ph: 'Mo-hab-bat' },
      { en: 'House', tr: 'Ghar', ph: 'Ghar' },
      { en: 'Book', tr: 'Kitaab', ph: 'Ki-taab' },
      { en: 'Mother', tr: 'Maan', ph: 'Maan' },
      { en: 'Father', tr: 'Baap', ph: 'Baap' },
      { en: 'Wife', tr: 'Biwi', ph: 'Bee-wee' },
      { en: 'Husband', tr: 'Shohar', ph: 'Sho-har' },
      { en: 'Beautiful', tr: 'Khoobsurat', ph: 'Khoob-soo-rat' },
      { en: 'Peace', tr: 'Aman', ph: 'A-man' },
      { en: 'Happy', tr: 'Khush', ph: 'Khush' },
      { en: 'Family', tr: 'Khandan', ph: 'Khan-daan' },
      { en: 'Work', tr: 'Kaam', ph: 'Kaam' },
      { en: 'Time', tr: 'Waqt', ph: 'Waq-t' },
      { en: 'City', tr: 'Shehr', ph: 'Shehr' },
      { en: 'Night', tr: 'Raat', ph: 'Raat' },
      { en: 'Day', tr: 'Din', ph: 'Din' },
      { en: 'Big', tr: 'Bara', ph: 'Ba-ra' },
      { en: 'Small', tr: 'Chhota', ph: 'Chho-ta' },
      { en: 'Hot', tr: 'Garam', ph: 'Ga-ram' },
      { en: 'Cold', tr: 'Thanda', ph: 'Than-da' },
      { en: 'Money', tr: 'Paisa', ph: 'Pai-sa' },
      { en: 'Car', tr: 'Gaari', ph: 'Gaa-ree' },
      { en: 'Road', tr: 'Sarak', ph: 'Sa-rak' },
      { en: 'Child', tr: 'Bacha', ph: 'Ba-cha' },
    ],
    sa: [
      { en: 'Hello', tr: 'Namaste', ph: 'Na-mas-te' },
      { en: 'Thank you', tr: 'Dhanyavaadah', ph: 'Dhan-ya-vaad' },
      { en: 'Yes', tr: 'Aam', ph: 'Aam' },
      { en: 'No', tr: 'Na', ph: 'Na' },
      { en: 'Please', tr: 'Kripaya', ph: 'Kri-pa-ya' },
      { en: 'Water', tr: 'Jalam', ph: 'Ja-lam' },
      { en: 'Food', tr: 'Annam', ph: 'An-nam' },
      { en: 'Friend', tr: 'Mitram', ph: 'Mi-tram' },
      { en: 'Good', tr: 'Sadṛśam', ph: 'Sad-risham' },
      { en: 'Love', tr: 'Prema', ph: 'Pre-ma' },
      { en: 'Mother', tr: 'Mata', ph: 'Ma-ta' },
      { en: 'Father', tr: 'Pita', ph: 'Pi-ta' },
      { en: 'Wife', tr: 'Patni', ph: 'Pat-nee' },
      { en: 'Husband', tr: 'Patih', ph: 'Pa-tih' },
      { en: 'Sun', tr: 'Sūryaḥ', ph: 'Soo-ryah' },
      { en: 'Moon', tr: 'Candraḥ', ph: 'Chan-drah' },
      { en: 'Peace', tr: 'Śāntiḥ', ph: 'Shaan-tih' },
      { en: 'Knowledge', tr: 'Vidyā', ph: 'Vid-yaa' },
      { en: 'Beauty', tr: 'Saundaryam', ph: 'Sau-ndar-yam' },
      { en: 'Happiness', tr: 'Sukham', ph: 'Su-kham' },
      { en: 'Life', tr: 'Jīvanam', ph: 'Jee-va-nam' },
      { en: 'Truth', tr: 'Satyam', ph: 'Sat-yam' },
      { en: 'God', tr: 'Īśvaraḥ', ph: 'Eesh-va-rah' },
      { en: 'World', tr: 'Lokaḥ', ph: 'Lo-kah' },
      { en: 'Mind', tr: 'Manaḥ', ph: 'Ma-nah' },
      { en: 'Soul', tr: 'Ātmā', ph: 'Aat-maa' },
      { en: 'Path', tr: 'Mārgaḥ', ph: 'Maar-gah' },
      { en: 'Light', tr: 'Prakāśaḥ', ph: 'Pra-kaa-shah' },
      { en: 'Darkness', tr: 'Tamaḥ', ph: 'Ta-mah' },
      { en: 'Power', tr: 'Śaktiḥ', ph: 'Shak-tih' },
      { en: 'Flower', tr: 'Puṣpam', ph: 'Push-pam' },
      { en: 'River', tr: 'Nadī', ph: 'Na-dee' },
      { en: 'Child', tr: 'Śiśuḥ', ph: 'Shi-shuh' },
    ],
    tr: [
      { en: 'Hello', tr: 'Merhaba', ph: 'Mer-ha-ba' },
      { en: 'Thank you', tr: 'Teşekkür ederim', ph: 'Te-shek-kur e-de-rim' },
      { en: 'Yes', tr: 'Evet', ph: 'E-vet' },
      { en: 'No', tr: 'Hayır', ph: 'Ha-yïr' },
      { en: 'Please', tr: 'Lütfen', ph: 'Lüt-fen' },
      { en: 'Water', tr: 'Su', ph: 'Soo' },
      { en: 'Food', tr: 'Yemek', ph: 'Ye-mek' },
      { en: 'Friend', tr: 'Arkadaş', ph: 'Ar-ka-dash' },
      { en: 'Good', tr: 'İyi', ph: 'Ee' },
      { en: 'Love', tr: 'Aşk', ph: 'Ashk' },
      { en: 'House', tr: 'Ev', ph: 'Ev' },
      { en: 'Book', tr: 'Kitap', ph: 'Kee-tap' },
      { en: 'Mother', tr: 'Anne', ph: 'An-ne' },
      { en: 'Father', tr: 'Baba', ph: 'Ba-ba' },
      { en: 'Wife', tr: 'Eş', ph: 'Esh' },
      { en: 'Husband', tr: 'Koca', ph: 'Ko-ja' },
      { en: 'Beautiful', tr: 'Güzel', ph: 'Gü-zel' },
      { en: 'Peace', tr: 'Barış', ph: 'Ba-rïsh' },
      { en: 'Happy', tr: 'Mutlu', ph: 'Mut-lu' },
      { en: 'Family', tr: 'Aile', ph: 'Ai-le' },
      { en: 'Work', tr: 'İş', ph: 'Eesh' },
      { en: 'Time', tr: 'Zaman', ph: 'Za-man' },
      { en: 'City', tr: 'Şehir', ph: 'She-hir' },
      { en: 'Night', tr: 'Gece', ph: 'Ge-je' },
      { en: 'Day', tr: 'Gün', ph: 'Gün' },
      { en: 'Big', tr: 'Büyük', ph: 'Bü-yük' },
      { en: 'Small', tr: 'Küçük', ph: 'Kü-chük' },
      { en: 'Hot', tr: 'Sıcak', ph: 'Sï-jak' },
      { en: 'Cold', tr: 'Soğuk', ph: 'So-ook' },
      { en: 'Money', tr: 'Para', ph: 'Pa-ra' },
      { en: 'Car', tr: 'Araba', ph: 'A-ra-ba' },
      { en: 'Road', tr: 'Yol', ph: 'Yol' },
      { en: 'Child', tr: 'Çocuk', ph: 'Cho-jook' },
    ],
    es: [
      { en: 'Hello', tr: 'Hola', ph: 'OH-la' },
      { en: 'Thank you', tr: 'Gracias', ph: 'GRAH-see-ahs' },
      { en: 'Yes', tr: 'Sí', ph: 'SEE' },
      { en: 'No', tr: 'No', ph: 'NO' },
      { en: 'Please', tr: 'Por favor', ph: 'por fah-VOR' },
      { en: 'Water', tr: 'Agua', ph: 'AH-gwa' },
      { en: 'Food', tr: 'Comida', ph: 'ko-MEE-da' },
      { en: 'Friend', tr: 'Amigo', ph: 'ah-MEE-go' },
      { en: 'Good', tr: 'Bueno', ph: 'BWEH-no' },
      { en: 'Love', tr: 'Amor', ph: 'ah-MOR' },
      { en: 'House', tr: 'Casa', ph: 'KA-sa' },
      { en: 'Book', tr: 'Libro', ph: 'LEE-bro' },
      { en: 'School', tr: 'Escuela', ph: 'es-KWEH-la' },
      { en: 'Mother', tr: 'Madre', ph: 'MA-dre' },
      { en: 'Father', tr: 'Padre', ph: 'PA-dre' },
      { en: 'Wife', tr: 'Esposa', ph: 'es-PO-sa' },
      { en: 'Husband', tr: 'Esposo', ph: 'es-PO-so' },
      { en: 'Beautiful', tr: 'Hermoso', ph: 'er-MO-so' },
      { en: 'Happy', tr: 'Feliz', ph: 'feh-LEES' },
      { en: 'Family', tr: 'Familia', ph: 'fa-MEE-lee-a' },
      { en: 'Work', tr: 'Trabajo', ph: 'tra-BA-ho' },
      { en: 'Time', tr: 'Tiempo', ph: 'tee-EM-po' },
      { en: 'City', tr: 'Ciudad', ph: 'see-oo-DAD' },
      { en: 'Night', tr: 'Noche', ph: 'NO-che' },
      { en: 'Day', tr: 'Día', ph: 'DEE-a' },
      { en: 'Big', tr: 'Grande', ph: 'GRAN-de' },
      { en: 'Small', tr: 'Pequeño', ph: 'peh-KE-nyo' },
      { en: 'Hot', tr: 'Caliente', ph: 'ka-lee-EN-te' },
      { en: 'Cold', tr: 'Frío', ph: 'FREE-o' },
      { en: 'Money', tr: 'Dinero', ph: 'dee-NEH-ro' },
      { en: 'Car', tr: 'Coche', ph: 'KO-che' },
      { en: 'Road', tr: 'Camino', ph: 'ka-MEE-no' },
      { en: 'Child', tr: 'Niño', ph: 'NEE-nyo' },
    ],
    fr: [
      { en: 'Hello', tr: 'Bonjour', ph: 'bohn-ZHOOR' },
      { en: 'Thank you', tr: 'Merci', ph: 'mair-SEE' },
      { en: 'Yes', tr: 'Oui', ph: 'WEE' },
      { en: 'No', tr: 'Non', ph: 'NOHN' },
      { en: 'Please', tr: 'S’il vous plaît', ph: 'seel voo PLEH' },
      { en: 'Water', tr: 'Eau', ph: 'OH' },
      { en: 'Food', tr: 'Nourriture', ph: 'noo-ree-TEWR' },
      { en: 'Friend', tr: 'Ami', ph: 'ah-MEE' },
      { en: 'Good', tr: 'Bon', ph: 'BOHN' },
      { en: 'Love', tr: 'Amour', ph: 'ah-MOOR' },
      { en: 'House', tr: 'Maison', ph: 'meh-ZOHN' },
      { en: 'Book', tr: 'Livre', ph: 'LEEV-r' },
      { en: 'School', tr: 'École', ph: 'ay-KOL' },
      { en: 'Mother', tr: 'Mère', ph: 'MEHR' },
      { en: 'Father', tr: 'Père', ph: 'PEHR' },
      { en: 'Wife', tr: 'Femme', ph: 'FAM' },
      { en: 'Husband', tr: 'Mari', ph: 'ma-REE' },
      { en: 'Beautiful', tr: 'Beau', ph: 'BOH' },
      { en: 'Happy', tr: 'Heureux', ph: 'uh-RUH' },
      { en: 'Family', tr: 'Famille', ph: 'fa-MEE-y' },
      { en: 'Work', tr: 'Travail', ph: 'tra-VAI' },
      { en: 'Time', tr: 'Temps', ph: 'TAHN' },
      { en: 'City', tr: 'Ville', ph: 'VEEL' },
      { en: 'Night', tr: 'Nuit', ph: 'NWEE' },
      { en: 'Day', tr: 'Jour', ph: 'ZHOOR' },
      { en: 'Big', tr: 'Grand', ph: 'GRAHN' },
      { en: 'Small', tr: 'Petit', ph: 'Puh-TEE' },
      { en: 'Hot', tr: 'Chaud', ph: 'SHOH' },
      { en: 'Cold', tr: 'Froid', ph: 'FRWA' },
      { en: 'Money', tr: 'Argent', ph: 'ar-ZHAHN' },
      { en: 'Car', tr: 'Voiture', ph: 'vwa-TYOOR' },
      { en: 'Road', tr: 'Route', ph: 'ROOT' },
      { en: 'Child', tr: 'Enfant', ph: 'On-fahn' },
    ],
  };

  // Grammar tips
  const grammarTips = {
    ar: 'Arabic grammar includes 3 cases, dual/plural forms, verb conjugation by person/gender/number/tense, definite article al-, root-and-pattern system, right-to-left script, many dialects vs MSA.',
    bn: 'Bengali has no grammatical gender, postpositions, verb conjugation by tense/person/honorific, polite speech important, compound verbs, classifiers for nouns, no articles.',
    ko: 'Korean has honorific levels, particles for roles, adjectives conjugate like verbs, SOV order, Hangul script, counters for objects, topic/subject markers.',
    ja: 'Japanese uses particles, no gender/number/plural, verb conjugation for tense/polite, subject often omitted, 3 scripts, politeness levels, counters.',
    zh: 'Mandarin has no verb conjugation, no articles/plural/gender, tone changes meaning, measure words, SVO order, logographic characters.',
    ur: 'Urdu has gender, verb agrees with subject, postpositions, honorifics important, Nastaliq script, ergative in perfective, Persian/Arabic loanwords.',
    sa: 'Sanskrit has 8 cases, 3 numbers/genders, complex verb system, sandhi rules, Devanagari script, highly inflected, compounds common.',
    tr: 'Turkish has vowel harmony, agglutinative suffixes, no gender, SOV order, 6 cases, possessive suffixes, question -mi.',
    es: 'Spanish has gender agreement, ser/estar distinction, subjunctive mood, tú/usted, preterite/imperfect, por/para.',
    fr: 'French has gender/number agreement, complex verbs, silent letters, nasal vowels, tu/vous, liaison, passé composé/imparfait, subjunctive.',
  };

  // State
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [mode, setMode] = useState('lessons');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showGrammar, setShowGrammar] = useState(false);

  const currentVocab = selectedLanguage ? vocabulary[selectedLanguage.id] || [] : [];
  const currentWord = currentVocab[currentIndex] || { en: '', tr: '', ph: '' };

  const startLesson = (lang) => {
    setSelectedLanguage(lang);
    setMode('lessons');
    setCurrentIndex(0);
    setShowAnswer(false);
    setScore(0);
    setUserAnswer('');
    setShowGrammar(false);
  };

  const nextWord = () => {
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setUserAnswer('');
    } else {
      Alert.alert('Finished!', 'You completed all words!');
      setCurrentIndex(0);
    }
  };

  const checkQuizAnswer = () => {
    if (!userAnswer.trim()) {
      Alert.alert('Empty', 'Please type your answer.');
      return;
    }

    const correct = currentWord.tr.toLowerCase().trim();
    const user = userAnswer.trim().toLowerCase();

    if (user === correct) {
      setScore(score + 1);
      Alert.alert('Correct!', `\( {currentWord.tr} ( \){currentWord.ph})`);
    } else {
      Alert.alert('Wrong', `Correct is: \( {currentWord.tr} ( \){currentWord.ph})`);
    }

    setShowAnswer(true);
    setUserAnswer('');
  };

  const restart = () => {
    setSelectedLanguage(null);
    setMode('lessons');
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setUserAnswer('');
    setShowGrammar(false);
  };

  // Language selection screen
  if (!selectedLanguage) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Language Learning App</Text>
        <Text style={styles.subtitle}>Choose a Language</Text>

        <ScrollView contentContainerStyle={styles.langList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.langCard}
              onPress={() => startLesson(lang)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={styles.langName}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main app screen
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {selectedLanguage.flag} {selectedLanguage.name}
      </Text>

      <Text style={styles.subtitle}>
        {mode === 'lessons' ? 'Flashcards' : 'Quiz'} • {currentIndex + 1} / {currentVocab.length || '0'}
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => mode === 'lessons' && setShowAnswer(!showAnswer)}
      >
        <Text style={styles.englishWord}>{currentWord.en || 'No word'}</Text>

        {(showAnswer || mode === 'quiz') && currentWord.tr && (
          <View style={styles.translationBox}>
            <Text style={styles.targetWord}>{currentWord.tr}</Text>
            <Text style={styles.phoneticText}>({currentWord.ph})</Text>
          </View>
        )}
      </TouchableOpacity>

      {mode === 'lessons' ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => setShowAnswer(!showAnswer)}
          >
            <Text style={styles.btnText}>
              {showAnswer ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimary} onPress={nextWord}>
            <Text style={styles.btnTextWhite}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizBox}>
          <TextInput
            style={styles.input}
            placeholder="Type translation here..."
            value={userAnswer}
            onChangeText={setUserAnswer}
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={checkQuizAnswer}>
            <Text style={styles.btnTextWhite}>Check</Text>
          </TouchableOpacity>

          <Text style={styles.scoreText}>Score: {score} / {currentVocab.length || 0}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.grammarButton}
        onPress={() => setShowGrammar(true)}
      >
        <Text style={styles.grammarButtonText}>Grammar Tips</Text>
      </TouchableOpacity>

      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'lessons' && styles.toggleActive]}
          onPress={() => setMode('lessons')}
        >
          <Text style={styles.toggleText}>Lessons</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'quiz' && styles.toggleActive]}
          onPress={() => {
            setMode('quiz');
            setCurrentIndex(0);
            setScore(0);
          }}
        >
          <Text style={styles.toggleText}>Quiz</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={restart}>
        <Text style={styles.backButtonText}>Back to Languages</Text>
      </TouchableOpacity>

      {/* Grammar Modal */}
      <Modal visible={showGrammar} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Grammar — {selectedLanguage.name}</Text>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalText}>
                {grammarTips[selectedLanguage.id] || 'No grammar tips available.'}
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowGrammar(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a3c5e', textAlign: 'center', marginTop: 30, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  langList: { alignItems: 'center', paddingBottom: 40 },
  langCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, marginVertical: 12, width: '85%', alignItems: 'center', elevation: 3 },
  flag: { fontSize: 60, marginBottom: 12 },
  langName: { fontSize: 22, fontWeight: '600', color: '#333' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 40, marginVertical: 30, alignItems: 'center', elevation: 4, minHeight: 200 },
  englishWord: { fontSize: 32, fontWeight: '500', color: '#222', marginBottom: 20 },
  translationBox: { alignItems: 'center' },
  targetWord: { fontSize: 32, color: '#0066cc', marginBottom: 8 },
  phoneticText: { fontSize: 18, color: '#555', fontStyle: 'italic' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  btnSecondary: { backgroundColor: '#6c757d', padding: 14, borderRadius: 12, width: '45%', alignItems: 'center' },
  btnPrimary: { backgroundColor: '#28a745', padding: 16, borderRadius: 12, width: '80%', alignItems: 'center', marginVertical: 12 },
  btnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  btnTextWhite: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  quizBox: { alignItems: 'center', marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 14, fontSize: 16, width: '80%', marginBottom: 16, backgroundColor: 'white' },
  checkBtn: { backgroundColor: '#0066cc', padding: 16, borderRadius: 12, width: '80%', alignItems: 'center' },
  scoreText: { fontSize: 18, color: '#28a745', marginTop: 20, fontWeight: '600' },
  modeToggle: { flexDirection: 'row', justifyContent: 'center', marginVertical: 30 },
  toggleBtn: { backgroundColor: '#e0e0e0', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20, marginHorizontal: 10 },
  toggleActive: { backgroundColor: '#0066cc' },
  toggleText: { color: 'white', fontWeight: '600' },
  grammarButton: { backgroundColor: '#ffc107', padding: 14, borderRadius: 12, alignItems: 'center', marginVertical: 20, width: '80%', alignSelf: 'center' },
  grammarButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  backButton: { backgroundColor: '#6c757d', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20, width: '80%', alignSelf: 'center' },
  backButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: 'white', borderRadius: 16, padding: 30, width: '88%', maxHeight: '80%' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a3c5e', marginBottom: 20, textAlign: 'center' },
  modalScroll: { maxHeight: 400 },
  modalText: { fontSize: 16, lineHeight: 24, color: '#444', textAlign: 'left' },
  closeModalButton: { backgroundColor: '#dc3545', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  closeModalText: { color: 'white', fontSize: 16, fontWeight: '600' },
});