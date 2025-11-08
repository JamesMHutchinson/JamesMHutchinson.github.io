// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-research-interest",
          title: "research interest",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/researchinterest/index.html";
          },
        },{id: "post-cantor-set-arithmetic",
        
          title: "Cantor Set Arithmetic",
        
        description: "combining fractals together",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/researchinterest/2025/cantor-set-arithmetic/";
          
        },
      },{id: "post-clark-quarry-paleoecology-project",
        
          title: "Clark Quarry Paleoecology Project",
        
        description: "some data analysis on fossils",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/researchinterest/2025/Paleoecology-Project/";
          
        },
      },{id: "post-sierpiński-carpet",
        
          title: "Sierpiński Carpet",
        
        description: "preliminary fractal study",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/researchinterest/2025/sierpinski-carpet/";
          
        },
      },{id: "post-beer-poster",
        
          title: "BEER Poster",
        
        description: "modeling with differential equations",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/researchinterest/2023/BEER-poster/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%4A%61%6D%65%73.%48%75%74%63%68%69%6E%73%6F%6E@%63%63%67%61.%65%64%75", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
