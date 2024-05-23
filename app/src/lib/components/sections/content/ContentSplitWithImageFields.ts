export const contentSplitWithImageFields: ISectionFields = {
  image: {
    index: 0,
    label: "Imagem",
    type: "image",
    value: {
      alt: "Imagem do conteudo",
      src: "https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=2876&h=1920&dpr=1",
      type: "url",      
    } as ISectionFieldImage,
  },
  preTitle: {
    index:1,
    label: "Pré titulo",
    type: "text",
    value: "<p>Laboris occaecat nostrud</p>",
    enable: true,    
  },
  title: {
    index: 2,
    label: "Titulo",
    type: "text",
    value: "<p>Esse minim velit adipisicing laboris nisi excepteur.</p>",    
  },
  textOne: {
    index: 3,
    label: "Texto 1",
    type: "text",
    value: "<p>Occaecat id amet nostrud reprehenderit et. Non incididunt irure anim enim. Sit sint labore eu consequat magna dolor magna commodo esse dolor id. In est est anim esse cillum non fugiat consequat laborum.</p>",
    enable: true,    
  },  
  textTwo: {
    index: 4,
    label: "Texto 2",
    type: "text",
    value: "<p>Proident aliqua consequat reprehenderit sit laboris in. Fugiat tempor eu reprehenderit nostrud ex. Minim occaecat ex pariatur dolor voluptate mollit duis consequat tempor. Consequat mollit cillum magna ea. Sint aliquip commodo ea ex cillum occaecat consequat qui laboris esse voluptate officia Lorem laborum.</p>",
    enable: true,    
  },  
  topics: {
    index: 5,
    label: "Caracteristicas",
    type: "list",
    value: {
      min: 1,
      type: "map",
      items: [
        {
          icon: {
            index: 0,
            label: "Ícone",
            type: "icon",
            value: "mdi:star",
            enable: true,            
          },
          topic: {
            index: 1,
            label: "Tópico",
            type: "text",
            value: "<p>Do id ullamco sint: </p>",            
          },
          text: {
            index: 2,
            label: "Texto",
            type: "text",
            value: "<p>Esse id est duis laborum laboris ipsum amet sint consequat esse magna eu aute eu.</p>",            
          },
        },
        {
          icon: {
            index: 0,
            label: "Ícone",
            type: "icon",
            value: "mdi:star",
            enable: true,            
          },
          topic: {
            index: 1,
            label: "Tópico",
            type: "text",
            value: "<p>Do id ullamco sint: </p>",            
          },
          text: {
            index: 2,
            label: "Texto",
            type: "text",
            value: "<p>Esse id est duis laborum laboris ipsum amet sint consequat esse magna eu aute eu.</p>",            
          },
        },
      ] as ISectionFields[]
    } as ISectionFieldList,    
  },
  textEnd: {
    index: 6,
    label: "Texto final",
    type: "text",
    value: "Labore in elit laborum dolor nisi do quis commodo magna voluptate excepteur elit. Nulla sunt anim dolor adipisicing ea occaecat dolore voluptate aliqua aute. Consectetur reprehenderit ad aliquip dolore commodo ullamco consequat irure aute esse consectetur magna cupidatat aliqua. Aliqua ex non proident officia veniam veniam nisi. Cupidatat aliquip ipsum adipisicing enim sit voluptate cillum deserunt Lorem tempor aute et velit nisi. Qui aute irure aliquip nulla tempor adipisicing est irure sunt magna.",
    enable: true,    
  }
}