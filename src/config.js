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
      totalWatched: "1,300+",
      description: "A lifelong appreciation for cinema and visual storytelling across all genres. I track my viewing log and ratings on Letterboxd.",
      favorites: [
        {
          title: "Schindler's List",
          year: "1993",
          rating: "10/10",
          link: "https://letterboxd.com/film/schindlers-list/",
        },
        {
          title: "Cinema Paradiso",
          year: "1988",
          rating: "10/10",
          link: "https://letterboxd.com/film/cinema-paradiso/",
        },
        {
          title: "The Color of Paradise",
          year: "1999",
          rating: "10/10",
          link: "https://letterboxd.com/film/the-color-of-paradise/",
        },
        {
          title: "Terminator 2: Judgment Day",
          year: "1991",
          rating: "10/10",
          link: "https://letterboxd.com/film/terminator-2-judgment-day/",
        },
        {
          title: "The Exorcist",
          year: "1973",
          rating: "10/10",
          link: "https://letterboxd.com/film/the-exorcist/",
        },
      ],
    },
  },
};
