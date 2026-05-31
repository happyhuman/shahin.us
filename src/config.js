// Site configuration constants
export const siteConfig = {
  // The logo text displayed in the top-left corner of the header
  logoText: "shahin.us",

  // The tagline displayed beneath the profile picture on the home page
  profileTagline: "always a student",

  // QR Code configuration on the home page
  qrCode: {
    // Path to the QR code image in the public folder
    imagePath: "/linkedin-qr.svg",
    // Title of the QR code card
    title: "Connect",
    // Label displayed beneath the QR code image
    label: "Scan to Connect on LinkedIn",
  },

  // Hobbies and Interests configuration
  interests: {
    // Chess.com details
    chess: {
      username: "happyhuman",
      profileUrl: "https://www.chess.com/member/happyhuman",
    },

    // Letterboxd details
    movies: {
      profileUrl: "https://letterboxd.com/happyhuman/",
      favoritesUrl: "https://letterboxd.com/happyhuman/list/my-absolute-favorites/",
      totalWatched: "1,400+",
      // A curated list of your absolute favorite movies (10/10 ratings)
      // Feel free to replace these placeholder titles, years, and links
      favorites: [
        {
          title: "Inception",
          year: "2010",
          rating: "10/10",
          link: "https://letterboxd.com/film/inception/",
        },
        {
          title: "Interstellar",
          year: "2014",
          rating: "10/10",
          link: "https://letterboxd.com/film/interstellar/",
        },
        {
          title: "The Matrix",
          year: "1999",
          rating: "10/10",
          link: "https://letterboxd.com/film/the-matrix/",
        },
        {
          title: "Pulp Fiction",
          year: "1994",
          rating: "10/10",
          link: "https://letterboxd.com/film/pulp-fiction/",
        },
      ],
    },
  },
};
