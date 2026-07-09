// src/Context/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    nav: {
      links: [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'who-can-join', label: 'Who can join' },
        { id: 'community', label: 'Community' },
        { id: 'community', label: 'Events' },
        { id: 'contact', label: 'Contact' },
      ],
      joinButton: 'Login',},
    hero: {
      slide1: {
        heading: ['Empowering Women. Building Communities.', 'Creating Opportunities'],
        description:
          'Vedacraft connects women entrepreneurs, self-help groups, artisans and eco-friendly businesses across Tamil Nadu to learn, collaborate and grow together',
        button: 'Join Vedacraft',
      },
      slide2: {
        heading: 'How Vedacraft Support Your Journey',
        description:
          'Everything you need to learn, connect, and grow your business - all in one supportive community',
        button: 'Explore Community',
        features: [
          { title: 'Connect', text: 'Join self-help groups and meet like-minded women' },
          { title: 'Learn', text: 'Access workshops, training, and expert guidance' },
          { title: 'Grow', text: 'Expand your business and reach more customers.' },
        ],
      },
    },
    about: {
      label: 'About Vedacraft',
      heading: 'The Story Behind Vedacraft',
      founderName: 'Banu Priya',
      founderRole: 'Founder of the VedaCraft',
      points: [
        'Vedacraft was born from a simple belief — talented women in our communities deserve opportunities to grow, connect, and succeed.',
        'Across Tamil Nadu, thousands of women create handmade products, traditional foods, eco-friendly solutions, and unique crafts. However, many of them struggle to find markets, visibility, and business support.',
        'Vedacraft was created to bridge that gap.',
        'More than a platform, Vedacraft is a growing community where women entrepreneurs, self-help groups, artisans, and eco-conscious businesses come together to share knowledge, discover opportunities, and build sustainable livelihoods.',
        'Our mission is to empower women, strengthen communities, and create a future where every skill has value and every entrepreneur has a chance to grow',
      ],
    },
    whoCanJoin: {
      label: 'Who Can Join Vedacraft',
      heading: 'A Community for Every Women',
      categories: [
        { title: 'Women Entrepreneurs', desc: 'Grow your business, gain visibility and connect with opportunities' },
        { title: 'Eco-Friendly Businesses', desc: 'Promote sustainable products and build a conscious community' },
        { title: 'Artisans', desc: 'Preserve traditional crafts and reach a wider community' },
        { title: 'Secure Shopping', desc: 'Safe payments and reliable delivery services' },
      ],
      howLabel: 'How It Work',
      howHeading: 'Join. Connect. Grow.',
      steps: [
        { label: 'Join', desc: 'Create your profile and become a part of your growing community' },
        { label: 'Connect', desc: 'Network with Women entrepreneurs, groups and mentors' },
        { label: 'Grow', desc: 'Collaborate, learn and unlock new opportunities for growth' },
      ],
    },
    successStory: {
      label: 'Success Story',
      heading: 'Real Women. Real Impact',
      testimonials: [
        { quote: 'Vedacraft connect us with the right people and platforms. Our SHG Income increased by 40% in just six months.', name: 'Lakshmi', role: 'SHG Leader, Trichy' },
        { quote: 'Through workshops and mentorship, I learned new Skills and grew my eco-friendly brand.', name: 'Revathi', role: 'Entrepreneur, Coimbatore' },
        { quote: "Vedacraft is more than a platform it's a family that support and encourages every women.", name: 'Meena Devi', role: 'Entrepreneur, Salem' },
      ],
    },
    community: {
      ourCommunityLabel: 'Our Community',
      members: [
        { name: 'Priya Lakshmi', craft: 'Handmade Craft', location: 'Chennai' },
        { name: 'Kavitha Selvi', craft: 'Handmade Craft', location: 'Chennai' },
        { name: 'Women SHG', craft: 'Handmade Craft', location: 'Chennai' },
        { name: 'Priya Lakshmi', craft: 'Handmade Craft', location: 'Chennai' },
      ],
      eventsLabel: 'Events',
      eventsHeadingPart1: 'Where the community',
      eventsHeadingPart2: 'comes alive.',
      events: [
        { tag: 'WORKSHOP', title: 'Digital Selling Workshop', date: 'Aug 24, 2026', location: 'Madurai, TN' },
        { tag: 'EXHIBITION', title: 'Digital Selling Workshop', date: 'Aug 24, 2026', location: 'Madurai, TN' },
        { tag: 'COFFEE MEET', title: 'Digital Selling Workshop', date: 'Aug 24, 2026', location: 'Madurai, TN' },
        { tag: 'ADVOCACY', title: 'Digital Selling Workshop', date: 'Aug 24, 2026', location: 'Madurai, TN' },
      ],
      registerButton: 'Register',
    },
    form: {
      heading: 'Ready to be a part of the movement ?',
      description: 'Join Vedacraft today and be part of a strong community of women building a better tomorrow.',
      labels: { name: 'Name', email: 'Email Id', businessType: 'Business Type', phone: 'Phone', city: 'City' },
      placeholders: { name: 'Your Name', email: '@example', businessType: 'handcraft', phone: '658492347', city: 'Tirunelveli' },
      joinButton: 'Join',
    },
        footer: {
      tagline: 'Empowering rural women entrepreneurs, self-help groups, and artisans to build sustainable, joyful businesses.',
      phone: '+91 9095422237',
      email: 'vedaconnecttvl@gmail.com',
      email1: 'admin@vedacraftscommunity.in',
      exploreLabel: 'Explore',
      exploreLinks: [
        { id: 'about', label: 'About' },
        { id: 'community', label: 'Event' },
        { id: 'who-can-join', label: 'Who Can Join' },
      ],
      contactLabel: 'Contact',
      contactLinks: [
        { id: 'contact', label: 'Contact' },
        { id: 'community', label: 'Community' },
      ],
    },
  },
  ta: {
    nav: {
      links: [
        { id: 'home', label: 'முகப்பு' },
        { id: 'about', label: 'பற்றி' },
        { id: 'who-can-join', label: 'யார் சேரலாம்' },
        { id: 'community', label: 'சமூகம்' },
        { id: 'community', label: 'நிகழ்வுகள்' },
        { id: 'contact', label: 'தொடர்பு' },
      ],
      joinButton: 'வேதகிராஃப்ட்டில் சேரவும்',
    },
    hero: {
      slide1: {
        heading: ['பெண்களால் உருவாக்கப்பட்ட தொழிலை வலுப்படுத்தி. சமூகங்களை இணைத்து. வாய்ப்புகளை உருவாக்குகிறோம்'],
        description:
          'வேதாகிராஃப்ட், தமிழ்நாடு முழுவதிலும் உள்ள பெண் தொழில்முனைவோர், சுய உதவிக் குழுக்கள், கைவினைக் கலைஞர்கள் மற்றும் சுற்றுச்சூழலுக்கு உகந்த வணிகங்களை ஒன்றிணைத்து, அவர்கள் கற்றுக்கொள்ளவும், ஒத்துழைக்கவும், ஒன்றாக வளரவும் உதவுகிறது',
        button: 'வேதகிராஃப்ட்டில் சேரவும்',
      },
      slide2: {
        heading: 'வேதாகிராஃப்ட் உங்கள் பயணத்திற்கு எப்படி',
        description: 'உங்கள் தொழிலை கற்றுக்கொள்ள, இணைக்க மற்றும் வளர்க்க தேவையான அனைத்தும் — ஒரே ஆதரவான சமூகத்தில்',
        button: 'சமூகத்தை ஆராயுங்கள்',
        features: [
          { title: 'இணைந்திடுங்கள்', text: 'சமூகத்துடன் இணையுங்கள்' },
          { title: 'கற்போம்', text: 'புதிய திறன்கள் பெறுங்கள்' },
          { title: 'வளர்ச்சி', text: 'தொழிலை விரிவாக்குங்கள்' },
        ],
      },
    },
    about: {
      label: 'வேதாகிராஃப்ட் அறிமுகம்',
      heading: 'வேதாகிராஃப்டின் பின்னணி கதை',
      founderName: 'பானு பிரியா',
      founderRole: 'வேதகிராஃப்ட் நிறுவனர்',
      points: [
        'வேதாகிராஃப்ட் ஒரு எளிய நம்பிக்கையிலிருந்து உருவானது — சமூகத்தில் உள்ள திறமையான பெண்களுக்கு வளர, இணைந்து செயல்பட, மற்றும் வெற்றி பெற வாய்ப்புகள் கிடைக்க வேண்டும்',
        'தமிழ்நாட்டின் பல கிராமங்களில் பெண்கள் கைவினைப் பொருட்கள், பாரம்பரிய உணவுகள், இயற்கை தயாரிப்புகள் மற்றும் பல்வேறு புதுமையான பொருட்களை உருவாக்குகின்றனர். ஆனால், அவர்களின் தயாரிப்புகள் சரியான சந்தையையும் வாய்ப்புகளையும் அடைய முடியாமல் இருக்கின்றன',
        'அந்த இடைவெளியை நிரப்புவதற்காகவே வேதாகிராஃப்ட் உருவாக்கப்பட்டது',
        'இது ஒரு தளம் மட்டுமல்ல; பெண்கள் தொழில்முனைவோர், சுயஉதவிக்குழுக்கள் மற்றும் கைவினைக் கலைஞர்கள் ஒன்றிணைந்து வளரக்கூடிய ஒரு சமூகமாகும்',
        'எங்களின் நோக்கம் பெண்களை வலுப்படுத்தி, சமூகங்களை வளர்த்து, ஒவ்வொரு திறமையும் மதிப்புமிக்கதாக மாறும் எதிர்காலத்தை உருவாக்குவதாகும்',
      ],
    },
    whoCanJoin: {
      label: 'வேதாகிராஃப்டில் யார் இணையலாம்?',
      heading: 'ஒவ்வொரு பெண்ணுக்குமான ஒரு சமூக தளம்',
      categories: [
        { title: 'பெண்கள் தொழில்முனைவோர்', desc: 'உங்கள் தொழிலை வளர்த்துக் கொள்ளுங்கள், அதிகமானோரிடம் உங்கள் அடையாளத்தை உருவாக்குங்கள் மற்றும் புதிய வாய்ப்புகளுடன் இணைந்திடுங்கள்' },
        { title: 'சுற்றுச்சூழல் நட்பு தொழில்கள்', desc: 'நிலையான மற்றும் இயற்கை சார்ந்த தயாரிப்புகளை ஊக்குவித்து, பொறுப்பான சமூகத்தை உருவாக்குங்கள்' },
        { title: 'கைவினைக் கலைஞர்கள்', desc: 'பாரம்பரிய கலைகளை பாதுகாத்து, உங்கள் படைப்புகளை விரிவான சமூகத்திற்கு கொண்டு செல்லுங்கள்' },
        { title: 'சுயஉதவிக் குழுக்கள்', desc: 'உங்கள் குழுவின் செயல்பாடுகளை வெளிப்படுத்தி, புதிய தொடர்புகள் மற்றும் வளர்ச்சி வாய்ப்புகளைப் பெறுங்கள்' },
      ],
      howLabel: 'இது எப்படி செயல்படுகிறது?',
      howHeading: 'இணையுங்கள். இணைந்திடுங்கள். வளருங்கள்.',
      steps: [
        { label: '1.இணையுங்கள்', desc: 'உங்கள் சுயவிவரத்தை உருவாக்கி, வளர்ந்து வரும் பெண்கள் சமூகத்தின் ஒரு பகுதியாகுங்கள்' },
        { label: '2.இணைந்திடுங்கள்', desc: 'பெண் தொழில்முனைவோர், குழுக்கள் மற்றும் வழிகாட்டிகளுடன் தொடர்புகளை உருவாக்குங்கள்' },
        { label: '3.வளருங்கள்', desc: 'ஒன்றிணைந்து செயல்படுங்கள், கற்றுக்கொள்ளுங்கள் மற்றும் வளர்ச்சிக்கான புதிய வாய்ப்புகளைப் பெறுங்கள்' },
      ],
    },
    successStory: {
      label: 'வெற்றிக் கதைகள்',
      heading: 'உண்மையான பெண்கள். உண்மையான தாக்கம்',
      testimonials: [
        { quote: ' வேதாகிராஃப்ட் எங்களை சரியான நபர்களுடனும் தளங்களுடனும் இணைத்தது. எங்கள் சுயஉதவிக் குழுவின் வருமானம் வெறும் ஆறு மாதங்களில் 40% அதிகரித்தது ', name: 'லக்ஷ்மி', role: 'சுய உதவி குழு தலைவர், திருச்சி' },
        { quote: ' பயிற்சிப் பட்டறைகள் மற்றும் வழிகாட்டுதல் நிகழ்ச்சிகள் மூலம் நான் புதிய திறன்களைக் கற்றுக்கொண்டு, எனது சுற்றுச்சூழல் நட்பு பிராண்டை வளர்த்தேன்.', name: 'ரேவதி', role: 'தொழில்முனைவோர், கோயம்புத்தூர்' },
        { quote: 'வேதாகிராஃப்ட் ஒரு சாதாரண தளம் அல்ல; அது ஒவ்வொரு பெண்ணையும் ஆதரித்து ஊக்குவிக்கும் ஒரு குடும்பம்', name: 'மீனா தேவி', role: 'தொழில்முனைவோர், சேலம்' },
      ],
    },
    community: {
      ourCommunityLabel: 'எங்கள் சமூகம்',
      members: [
        { name: 'பிரியா லக்ஷ்மி', craft: 'கையால் செய்யப்பட்ட கைவினை', location: 'சென்னை' },
        { name: 'கவிதா செல்வி', craft: 'கையால் செய்யப்பட்ட கைவினை', location: 'சென்னை' },
        { name: 'மகளிர் சுய உதவி குழு', craft: 'கையால் செய்யப்பட்ட கைவினை', location: 'சென்னை' },
        { name: 'பிரியா லக்ஷ்மி', craft: 'கையால் செய்யப்பட்ட கைவினை', location: 'சென்னை' },
      ],
      eventsLabel: 'நிகழ்வுகள்',
      eventsHeadingPart1: 'சமூகம் ஒன்றுகூடி ',
      eventsHeadingPart2: 'வளர்கிறது.',
      events: [
        { tag: 'பயிலரங்கு', title: 'டிஜிட்டல் விற்பனை பயிலரங்கு', date: 'ஆக 24, 2026', location: 'மதுரை, தமிழ்நாடு' },
        { tag: 'கண்காட்சி', title: 'டிஜிட்டல் விற்பனை பயிலரங்கு', date: 'ஆக 24, 2026', location: 'மதுரை, தமிழ்நாடு' },
        { tag: 'காபி சந்திப்பு', title: 'டிஜிட்டல் விற்பனை பயிலரங்கு', date: 'ஆக 24, 2026', location: 'மதுரை, தமிழ்நாடு' },
        { tag: 'வக்காலத்து', title: 'டிஜிட்டல் விற்பனை பயிலரங்கு', date: 'ஆக 24, 2026', location: 'மதுரை, தமிழ்நாடு' },
      ],
      registerButton: 'பதிவு செய்யவும்',
    },
    form: {
      heading: 'சமூகத்தின் ஒரு பகுதியாக தயாரா?',
      description: 'வேதாகிராஃப்டில் இன்று இணைந்து, சிறந்த நாளையைக் கட்டியெழுப்பும் பெண்களின் வலுவான சமூகத்தின் ஒரு பகுதியாகுங்கள்.',
      labels: { name: 'பெயர்', email: 'மின்னஞ்சல் முகவரி', businessType: 'வணிக வகை', phone: 'தொலைபேசி', city: 'நகரம்' },
      placeholders: { name: 'உங்கள் பெயர்', email: '@example', businessType: 'கைவினை', phone: '658492347', city: 'திருநெல்வேலி' },
      joinButton: 'சேரவும்',
    },
   footer: {
      tagline: 'கிராமப்புற பெண் தொழில்முனைவோர், சுய உதவி குழுக்கள் மற்றும் கைவினைஞர்களை நிலையான, மகிழ்ச்சியான வணிகங்களை உருவாக்க அதிகாரம் அளித்தல்.',
      phone: '+91 9095422237',
      email: 'vedaconnecttvl@gmail.com',
      email1: 'admin@vedacraftscommunity.in',
      exploreLabel: 'ஆராயுங்கள்',
      exploreLinks: [
        { id: 'about', label: 'பற்றி' },
        { id: 'community', label: 'நிகழ்வு' },
        { id: 'who-can-join', label: 'யார் சேரலாம்' },
      ],
      contactLabel: 'தொடர்பு',
      contactLinks: [
        { id: 'contact', label: 'தொடர்பு' },
        { id: 'community', label: 'சமூகம்' },
      ],
    },
  },
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)