import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialization of i18n with in-memory resources for testing
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          languages: {
            en: "English",
            lt: "Lithuanian",
            de: "German"
          },
          homepage : {
            home : "Home",
            about : "About",
            goToCategories : "Go to Categories",
            goToArticles : "Go to Articles",
            goToExercise : "Go to Exercise",
            flashingSentence : "Introducing our new web page \"Speedreader.com\", designed to help users read sentences quickly without being distracted by inner thoughts, boosting focus, improving comprehension, and saving time with faster reading speeds."
        },
        },
      },
      lt: {
        translation: {
          languages: {
            en: "Anglų",
            lt: "Lietuvių",
            de: "Vokiečių"
          },
          homepage: {
            home : "Namai",
            about : "Apie mus",
            goToCategories : "Eiti į Ketegorijos",
            goToArticles : "Eiti į Straipsniai",
            goToExercise : "Eiti į Užduotis",
            flashingSentence: "Pristatome mūsų naują internetinį puslapį \"Speedreader.com\", kuris padeda atsikratyti vidinio monologo skaitant. Šalia to, puslapis siekia pagerinti skaitytojo tekstų supratimą bei skaitytojo dėmesingumą. O svarbiausia - naudojantis šia svetaine, žmonės tiesiog sutaupys laiko skaitydami greičiau."
        },
        },
      },
      de: {
        translation: {
          languages: {
            en: "Englisch",
            lt: "Litauisch",
            de: "Deutsch"
          },
          homepage : {
            home : "Zur Hauptseite",
            about : "Über uns",
            goToCategories : "Zu den Kategorien",
            goToArticles : "Zum Artikel",
            goToExercise : "Zu den Übungen",
            flashingSentence : "Es war einmal ein Mädchen, dem war die Mutter gestorben. Ihre neue Stiefmutter hatte zwei Töchter mit ins Haus gebracht und sie waren alle sehr gemein zu ihr. Sie musste den ganzen Tag schwer arbeiten, früh aufstehen, Wasser tragen, Feuer machen, kochen und waschen. Abends, wenn sie müde war, musste sie sich neben den Herd in die Asche legen. Und weil sie darum immer staubig und schmutzig war, nannten sie es Aschenputtel. Es begab sich, daß der König ein großes Fest veranstaltete, auf dem sich der Prinz eine Gemahlin aussuchen sollte. Aschenputtel bat die Stiefmutter, sie möchte ihm erlauben hinzugehen. „Aschenputtel,“ antwortete die Stiefmutter, „du bist voll Staub und Schmutz und willst zum Fest? Du darfst nicht mit, denn du hast keine prächtigen Kleider.“ Darauf eilte sie mit ihren stolzen Töchtern fort. Aschenputtel ging zum Grab ihrer Mutter und weinte bis die Tränen darauf herniederfielen. Als sie die Augen wieder öffnete, trug sie plötzlich ein prächtiges Kleid und goldene Schuhe. So ging es zum Fest und der Prinz tanzte mit ihr. Als es Abend war, wollte Aschenputtel fort, der Prinz wollte sie begleiten, aber sie entsprang ihm so geschwind, daß er nicht folgen konnte. Auf der Treppe verlor sie einen ihrer Schuhe. Der Prinz fand den Schuh und sprach: „Keine andere soll meine Gemahlin werden, als die, an deren Fuß dieser goldene Schuh paßt.“ Und er ließ im ganzen Königreich nach dem Mädchen suchen, der der Schuh passte. Als er zu ihrem Hause kam, da passte der Schuh wie angegossen. Und als Aschenputtel sich in die Höhe richtete und dem Prinzen ins Gesicht sah, da erkannte er sie. Und sie lebten glücklich alle Tage."
        },
        },
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
