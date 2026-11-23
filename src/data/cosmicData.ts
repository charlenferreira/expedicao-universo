export type GalaxyKind = 'espiral' | 'eliptica' | 'irregular';

export interface GalaxyTypeInfo {
  id: GalaxyKind;
  name: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  example: string;
}

export interface CosmicAddressLevel {
  id: string;
  step: number;
  name: string;
  shortRole: string;
  scaleLabel: string;
  definition: string;
  curiosity: string;
  keyMetricLabel: string;
  keyMetricValue: string;
}

export interface AstronomicalUnitInfo {
  id: 'ua' | 'al' | 'pc';
  symbol: string;
  name: string;
  kmEquivalent: string;
  definition: string;
  bestUse: string;
  analogy: string;
  accentColor: string;
}

export interface CosmicDestination {
  id: string;
  name: string;
  category: string;
  ua: string;
  lightYears: string;
  parsecs: string;
  lightTravelTime: string;
  logScalePercent: number;
  didacticNote: string;
  recommendedUnit: string;
}

export type ExplorerScale = 'solar' | 'milkyway' | 'localgroup';

export interface ProminentMoonInfo {
  id: string;
  name: string;
  diameter: string;
  orbitalPeriod: string;
  summary: string;
  clickableBodyId?: string;
}

export interface ExplorerBody {
  id: string;
  scale: ExplorerScale;
  name: string;
  classification: string;
  cosmicAddress: string;
  distanceFromEarth: {
    ua: string;
    lightYears: string;
    parsecs: string;
  };
  curiosities: [string, string];
  hoverHint: string;
  color: string;
  glowColor: string;
  secondaryColor?: string;
  radius: number;
  // Orbital parameters (for Solar System planets & moons)
  orbitRadius?: number;
  orbitSpeed?: number;
  initialAngle?: number;
  orbitEccentricity?: number;
  hasRings?: boolean;
  ringColor?: string;
  parentBodyId?: string; // If this is a moon orbiting a planet
  // Fixed relative coordinates for Milky Way & Local Group (-1 to 1 normalized space)
  x?: number;
  y?: number;
  visualType: 'star' | 'planet' | 'moon' | 'blackhole' | 'nebula' | 'spiral_galaxy' | 'irregular_galaxy' | 'marker';
  prominentMoons?: ProminentMoonInfo[];
  orbitalPeriodLabel?: string;
}

export type QuizCategory = 'Galáxias e Via Láctea' | 'Organização do Universo' | 'Medidas Astronômicas';

export interface QuizQuestion {
  id: number;
  category: QuizCategory;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface SpaceRank {
  title: string;
  subtitle: string;
  description: string;
  accentClass: string;
}

export const GALAXY_TYPES: GalaxyTypeInfo[] = [
  {
    id: 'espiral',
    name: 'Galáxia Espiral',
    subtitle: 'Disco giratório com braços luminosos',
    description:
      'Possui um núcleo central denso cercado por um disco plano com braços em espiral ricos em gás, poeira e berçários de estrelas jovens e azuladas.',
    characteristics: [
      'Alta taxa de formação estelar nos braços',
      'Pode apresentar barra central (espiral barrada)',
      'Representa a maioria das grandes galáxias próximas',
    ],
    example: 'Via Láctea e Galáxia de Andrômeda (M31)',
  },
  {
    id: 'eliptica',
    name: 'Galáxia Elíptica',
    subtitle: 'Forma ovalada ou esférica de luz suave',
    description:
      'Apresenta distribuição tridimensional suave, sem braços espirais definidos. Abriga predominantemente estrelas antigas, avermelhadas e pouco gás livre.',
    characteristics: [
      'Quase não forma novas estrelas',
      'Varia de galáxias anãs até gigantes colossais',
      'Frequentam centros de grandes aglomerados',
    ],
    example: 'Messier 87 (M87) e IC 1101',
  },
  {
    id: 'irregular',
    name: 'Galáxia Irregular',
    subtitle: 'Estrutura assimétrica e dinâmica',
    description:
      'Não exibe simetria espiral nem elíptica, muitas vezes moldada por interações gravitacionais ou colisões recentes com galáxias maiores.',
    characteristics: [
      'Rica em nuvens de gás e poeira cósmica',
      'Regiões intensas de nascimento de estrelas',
      'Costuma ser menor que as galáxias espirais',
    ],
    example: 'Grande e Pequena Nuvem de Magalhães',
  },
];

export const MILKY_WAY_FACTS = [
  { label: 'Classificação', value: 'Espiral Barrada' },
  { label: 'Diâmetro aproximado', value: '100.000 anos-luz' },
  { label: 'População estelar', value: '100 a 400 bilhões' },
  { label: 'Núcleo central', value: 'Sagitário A*' },
  { label: 'Nosso setor', value: 'Braço de Órion' },
  { label: 'Distância do centro', value: '~26.000 anos-luz' },
];

export const COSMIC_ADDRESS_LEVELS: CosmicAddressLevel[] = [
  {
    id: 'terra',
    step: 1,
    name: 'Terra',
    shortRole: 'Nosso planeta natal',
    scaleLabel: '12.742 km de diâmetro',
    definition:
      'O terceiro planeta a partir do Sol e o único corpo celeste conhecido capaz de abrigar água líquida estável na superfície, atmosfera protetora e vida complexa.',
    curiosity:
      'Mesmo parecendo parada sob nossos pés, a Terra gira em torno do próprio eixo a cerca de 1.670 km/h no equador e orbita o Sol a impressionantes 107.000 km/h.',
    keyMetricLabel: 'Satélite natural',
    keyMetricValue: '1 (Lua)',
  },
  {
    id: 'sistema-solar',
    step: 2,
    name: 'Sistema Solar',
    shortRole: 'Sol, 8 planetas e corpos menores',
    scaleLabel: '~9 bilhões de km até Netuno (~60 UA de diâmetro)',
    definition:
      'Nosso sistema planetário governado pela gravidade do Sol, composto por quatro planetas rochosos internos, quatro gigantes externos, planetas anões, luas, asteroides e cometas.',
    curiosity:
      'O Sol concentra sozinho cerca de 99,86% de toda a massa do Sistema Solar — todos os planetas, luas e asteroides somados correspondem a apenas 0,14%.',
    keyMetricLabel: 'Planetas principais',
    keyMetricValue: '8 planetas',
  },
  {
    id: 'braco-orion',
    step: 3,
    name: 'Braço de Órion',
    shortRole: 'Braço espiral secundário onde estamos',
    scaleLabel: '~3.500 anos-luz de largura por 10.000 anos-luz de extensão',
    definition:
      'Um filamento espiral menor (também chamado de Espora de Órion) localizado entre os braços principais de Sagitário e de Perseu, onde o Sistema Solar navega.',
    curiosity:
      'A famosa Nebulosa de Órion — visível a olho nu no céu noturno brasileiro como o centro da "Espada de Órion" — é um berçário de estrelas localizado nesse mesmo braço.',
    keyMetricLabel: 'Distância ao núcleo galáctico',
    keyMetricValue: '~26.000 anos-luz',
  },
  {
    id: 'via-lactea',
    step: 4,
    name: 'Via Láctea',
    shortRole: 'Nossa galáxia espiral barrada',
    scaleLabel: '~100.000 anos-luz de diâmetro',
    definition:
      'Uma imensa ilha cósmica de forma espiral barrada que reúne entre 100 e 400 bilhões de estrelas, vastas nuvens moleculares, matéria escura e o buraco negro supermassivo Sagitário A* no centro.',
    curiosity:
      'O Sistema Solar leva cerca de 230 milhões de anos para completar uma única volta ao redor do centro da Via Láctea — um período chamado de "Ano Galáctico".',
    keyMetricLabel: 'Ano galáctico',
    keyMetricValue: '~230 milhões de anos',
  },
  {
    id: 'grupo-local',
    step: 5,
    name: 'Grupo Local',
    shortRole: 'Aglomerado com cerca de 80 galáxias',
    scaleLabel: '~10 milhões de anos-luz de diâmetro',
    definition:
      'A vizinhança galáctica ligada pela gravidade que reúne cerca de 80 galáxias. É dominado por duas grandes espirais: a Via Láctea e a Galáxia de Andrômeda (M31), acompanhadas pela Galáxia do Triângulo (M33) e dezenas de anãs.',
    curiosity:
      'A Via Láctea e Andrômeda estão se aproximando a cerca de 110 km/s e deverão iniciar uma fusão gravitacional daqui a aproximadamente 4,5 bilhões de anos.',
    keyMetricLabel: 'Galáxias dominantes',
    keyMetricValue: 'Via Láctea e Andrômeda',
  },
  {
    id: 'laniakea',
    step: 6,
    name: 'Superaglomerado de Laniakea',
    shortRole: 'Lar de cerca de 100.000 galáxias',
    scaleLabel: '~520 milhões de anos-luz de extensão',
    definition:
      'Uma bacia gravitacional gigantesca que engloba o Superaglomerado de Virgem e outros aglomerados vizinhos, onde cerca de 100.000 galáxias fluem ao longo de filamentos em direção ao Grande Atrator.',
    curiosity:
      'O nome "Laniakea" vem do havaiano e significa "céus incomensuráveis", em homenagem aos navegadores polinésios que usavam as estrelas para atravessar o Oceano Pacífico.',
    keyMetricLabel: 'Galáxias estimadas',
    keyMetricValue: '~100.000 galáxias',
  },
  {
    id: 'universo-observavel',
    step: 7,
    name: 'Universo Observável',
    shortRole: 'Todo o cosmos alcançável pela luz',
    scaleLabel: '~93 bilhões de anos-luz de diâmetro',
    definition:
      'A região esférica do cosmos centrada em nós da qual a luz teve tempo suficiente para chegar desde o Big Bang (há 13,8 bilhões de anos), ampliada continuamente pela expansão do espaço.',
    curiosity:
      'Estima-se que o Universo Observável abrigue cerca de 2 trilhões de galáxias organizadas em uma teia cósmica luminosa de filamentos e imensos vazios.',
    keyMetricLabel: 'Idade estimada',
    keyMetricValue: '13,8 bilhões de anos',
  },
];

export const ASTRONOMICAL_UNITS: AstronomicalUnitInfo[] = [
  {
    id: 'ua',
    symbol: 'UA',
    name: 'Unidade Astronômica',
    kmEquivalent: '~150 milhões de km',
    definition:
      'Corresponde à distância média entre a Terra e o Sol (exatamente 149.597.870,7 km). É a régua padrão para mapear distâncias dentro do Sistema Solar.',
    bestUse: 'Distâncias entre planetas, asteroides, cometas e sondas no Sistema Solar.',
    analogy:
      'Se a distância da Terra ao Sol fosse 1 passo (1 metro), Netuno estaria a 30 passos de distância e Júpiter a cerca de 5 passos.',
    accentColor: 'text-amber-300',
  },
  {
    id: 'al',
    symbol: 'al',
    name: 'Ano-luz',
    kmEquivalent: '~9,46 trilhões de km',
    definition:
      'É uma medida de distância — não de tempo! Representa o percurso que um raio de luz faz no vácuo durante um ano inteiro, viajando a ~300.000 km/s.',
    bestUse: 'Distâncias entre estrelas, nebulosas e galáxias pelo universo.',
    analogy:
      'A luz dá cerca de 7,5 voltas ao redor da Terra em apenas 1 segundo. Imagine o quão longe ela viaja sem parar durante 365 dias.',
    accentColor: 'text-sky-300',
  },
  {
    id: 'pc',
    symbol: 'pc',
    name: 'Parsec',
    kmEquivalent: '~30,9 trilhões de km (≈ 3,26 anos-luz)',
    definition:
      'Sigla de "paralaxe de um segundo de arco". É a unidade preferida por astrônomos profissionais para catálogos estelares e medições cosmológicas em larga escala.',
    bestUse: 'Astronomia profissional, distância de estrelas, galáxias (kpc) e aglomerados (Mpc).',
    analogy:
      'Funciona como um "múltiplo" do ano-luz: cada 1 parsec vale 3,26 anos-luz, facilitando cálculos diretos de trigonometria espacial.',
    accentColor: 'text-indigo-300',
  },
];

export const COSMIC_DESTINATIONS: CosmicDestination[] = [
  {
    id: 'lua',
    name: 'Lua',
    category: 'Satélite natural da Terra',
    ua: '0,00257 UA',
    lightYears: '0,0000000406 al',
    parsecs: '0,0000000125 pc',
    lightTravelTime: '1,3 segundo',
    logScalePercent: 8,
    didacticNote:
      'A cerca de 384.400 km, a Lua é tão próxima em termos cósmicos que caberiam todos os outros sete planetas do Sistema Solar lado a lado nesse espaço.',
    recommendedUnit: 'Quilômetros (km) ou fração de UA',
  },
  {
    id: 'sol',
    name: 'Sol',
    category: 'Nossa estrela central',
    ua: '1,00 UA',
    lightYears: '0,0000158 al',
    parsecs: '0,00000485 pc',
    lightTravelTime: '~8 minutos e 20 segundos',
    logScalePercent: 22,
    didacticNote:
      'Quando olhamos para a luz solar iluminando o dia, estamos vendo fótons que deixaram a superfície do Sol há pouco mais de 8 minutos.',
    recommendedUnit: 'Unidade Astronômica (1 UA exata)',
  },
  {
    id: 'netuno',
    name: 'Netuno',
    category: 'Planeta mais distante do Sol',
    ua: '29,1 a 30,1 UA',
    lightYears: '0,000476 al',
    parsecs: '0,000146 pc',
    lightTravelTime: '~4 horas e 10 minutos',
    logScalePercent: 38,
    didacticNote:
      'Comandos de rádio enviados da Terra até sondas na órbita de Netuno levam mais de 4 horas para chegar — e outras 4 horas para a resposta voltar.',
    recommendedUnit: 'Unidade Astronômica (UA)',
  },
  {
    id: 'proxima-centauri',
    name: 'Próxima Centauri',
    category: 'Estrela mais próxima após o Sol',
    ua: '268.400 UA',
    lightYears: '4,24 anos-luz',
    parsecs: '1,30 parsec',
    lightTravelTime: '~4,24 anos',
    logScalePercent: 60,
    didacticNote:
      'Mesmo sendo nossa vizinha estelar mais próxima, usar UA já gera centenas de milhares. Por isso, fora do Sistema Solar passamos a usar anos-luz e parsecs.',
    recommendedUnit: 'Ano-luz (al) ou Parsec (pc)',
  },
  {
    id: 'centro-via-lactea',
    name: 'Centro da Via Láctea',
    category: 'Região de Sagitário A*',
    ua: '1,64 bilhão de UA',
    lightYears: '26.000 anos-luz',
    parsecs: '~7.975 parsecs (~8 kpc)',
    lightTravelTime: '~26.000 anos',
    logScalePercent: 80,
    didacticNote:
      'A luz que hoje captamos do coração da Via Láctea partiu de lá quando a humanidade ainda vivia na última Era do Gelo.',
    recommendedUnit: 'Anos-luz ou Quiloparsecs (kpc)',
  },
  {
    id: 'andromeda',
    name: 'Galáxia de Andrômeda',
    category: 'Grande vizinha no Grupo Local',
    ua: '160,6 bilhões de UA',
    lightYears: '2,54 milhões de anos-luz',
    parsecs: '~778.000 parsecs (~0,78 Mpc)',
    lightTravelTime: '~2,54 milhões de anos',
    logScalePercent: 100,
    didacticNote:
      'É o objeto mais distante visível a olho nu sob céus escuros. Ao observá-la, contemplamos como ela era há 2,5 milhões de anos.',
    recommendedUnit: 'Milhões de anos-luz ou Megaparsecs (Mpc)',
  },
];

export const EXPLORER_BODIES: ExplorerBody[] = [
  // ================= ESCALA SISTEMA SOLAR =================
  {
    id: 'sol',
    scale: 'solar',
    name: 'Sol',
    classification: 'Estrela Anã Amarela (G2V)',
    cosmicAddress: 'Centro do Sistema Solar · Braço de Órion · Via Láctea',
    distanceFromEarth: {
      ua: '1,00 UA (~150 milhões km)',
      lightYears: '0,0000158 al (~8 min 20 s de luz)',
      parsecs: '0,00000485 pc',
    },
    curiosities: [
      'A cada segundo, o Sol funde cerca de 600 milhões de toneladas de hidrogênio em hélio no núcleo, gerando a luz e o calor que sustentam a vida na Terra.',
      'Seu diâmetro é de 1,39 milhão de quilômetros — caberiam cerca de 1,3 milhão de planetas Terra dentro do seu volume.',
    ],
    hoverHint: 'Estrela central · 99,86% da massa do sistema',
    color: '#FCD34D',
    glowColor: 'rgba(252, 211, 77, 0.72)',
    secondaryColor: '#F59E0B',
    radius: 23,
    orbitRadius: 0,
    orbitSpeed: 0,
    initialAngle: 0,
    visualType: 'star',
    orbitalPeriodLabel: 'Centro gravitacional',
  },
  {
    id: 'mercurio',
    scale: 'solar',
    name: 'Mercúrio',
    classification: 'Planeta Rochoso Interno',
    cosmicAddress: '1ª Órbita · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '0,61 a 1,39 UA (média orbital 0,39 UA do Sol)',
      lightYears: '0,0000097 al',
      parsecs: '0,0000030 pc',
    },
    curiosities: [
      'Por praticamente não ter atmosfera para reter calor, alterna entre 430 °C durante o dia e -180 °C à noite.',
      'Completa uma volta ao redor do Sol em apenas 88 dias terrestres, sendo o planeta mais veloz do Sistema Solar.',
    ],
    hoverHint: 'Órbita 0,39 UA · Ano de 88 dias',
    color: '#CBD5E1',
    glowColor: 'rgba(203, 213, 225, 0.45)',
    radius: 5.5,
    orbitRadius: 56,
    orbitSpeed: 0.92,
    initialAngle: 0.6,
    visualType: 'planet',
    orbitalPeriodLabel: '88 dias terrestres',
  },
  {
    id: 'venus',
    scale: 'solar',
    name: 'Vênus',
    classification: 'Planeta Rochoso Interno',
    cosmicAddress: '2ª Órbita · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '0,28 a 1,72 UA (0,72 UA do Sol)',
      lightYears: '0,0000044 al (mín.)',
      parsecs: '0,0000013 pc',
    },
    curiosities: [
      'É o planeta mais quente do Sistema Solar (~465 °C) devido a um efeito estufa extremo causado por sua densa atmosfera de CO₂.',
      'Gira no sentido contrário ao da maioria dos planetas (rotação retrógrada), fazendo o Sol nascer no oeste.',
    ],
    hoverHint: 'Órbita 0,72 UA · Planeta mais quente',
    color: '#FDE68A',
    glowColor: 'rgba(253, 230, 138, 0.52)',
    radius: 7.5,
    orbitRadius: 88,
    orbitSpeed: 0.62,
    initialAngle: 2.35,
    visualType: 'planet',
    orbitalPeriodLabel: '225 dias terrestres',
  },
  {
    id: 'terra',
    scale: 'solar',
    name: 'Terra',
    classification: 'Planeta Rochoso Habitável',
    cosmicAddress: '3ª Órbita · Sistema Solar · Braço de Órion · Via Láctea',
    distanceFromEarth: {
      ua: '0 UA (1,00 UA do Sol)',
      lightYears: '0 al (Ponto de referência)',
      parsecs: '0 pc',
    },
    curiosities: [
      'Cerca de 71% da sua superfície é coberta por água líquida, mantida estável pela posição privilegiada na zona habitável do Sol.',
      'Seu campo magnético gerado pelo núcleo de ferro líquido desvia o vento solar e protege nossa atmosfera.',
    ],
    hoverHint: 'Órbita 1,00 UA · 1 lua proeminente (Lua)',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.65)',
    secondaryColor: '#34D399',
    radius: 8.8,
    orbitRadius: 128,
    orbitSpeed: 0.45,
    initialAngle: -0.55,
    visualType: 'planet',
    orbitalPeriodLabel: '365,25 dias (1 ano)',
    prominentMoons: [
      {
        id: 'moon-lua',
        name: 'Lua',
        diameter: '3.474 km',
        orbitalPeriod: '27,3 dias',
        summary:
          'Estabiliza a inclinação do eixo terrestre (regulando nossas estações do ano) e governa as marés dos oceanos.',
        clickableBodyId: 'lua',
      },
    ],
  },
  {
    id: 'lua',
    scale: 'solar',
    name: 'Lua',
    classification: 'Satélite Natural da Terra',
    cosmicAddress: 'Órbita da Terra · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '0,00257 UA (384.400 km)',
      lightYears: '0,0000000406 al (1,3 s de luz)',
      parsecs: '0,0000000125 pc',
    },
    curiosities: [
      'A Lua está em rotação sincronizada com a Terra, por isso sempre vemos a mesma face voltada para nós.',
      'Ela se afasta lentamente do nosso planeta cerca de 3,8 centímetros por ano devido à transferência de energia das marés.',
    ],
    hoverHint: 'Satélite da Terra · 1,3 s de luz',
    color: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.55)',
    radius: 3.3,
    orbitRadius: 21,
    orbitSpeed: 3.1,
    initialAngle: 0.9,
    parentBodyId: 'terra',
    visualType: 'moon',
    orbitalPeriodLabel: '27,3 dias ao redor da Terra',
  },
  {
    id: 'marte',
    scale: 'solar',
    name: 'Marte',
    classification: 'Planeta Rochoso (Planeta Vermelho)',
    cosmicAddress: '4ª Órbita · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '0,52 a 2,52 UA (1,52 UA do Sol)',
      lightYears: '0,0000082 al (mín.)',
      parsecs: '0,0000025 pc',
    },
    curiosities: [
      'Abriga o Monte Olimpo, um vulcão com cerca de 21,9 km de altura — quase três vezes a altitude do Monte Everest.',
      'Evidências de antigos leitos de rios e minerais indicam que Marte teve água líquida correndo em sua superfície há bilhões de anos.',
    ],
    hoverHint: 'Órbita 1,52 UA · Luas Fobos e Deimos',
    color: '#F87171',
    glowColor: 'rgba(248, 113, 113, 0.5)',
    radius: 6.8,
    orbitRadius: 170,
    orbitSpeed: 0.34,
    initialAngle: 1.55,
    visualType: 'planet',
    orbitalPeriodLabel: '687 dias terrestres',
    prominentMoons: [
      {
        id: 'moon-fobos',
        name: 'Fobos',
        diameter: '22,5 km',
        orbitalPeriod: '7h 39min',
        summary:
          'A maior e mais interna lua de Marte; orbita tão perto que nasce no oeste e cruza o céu marciano duas vezes por dia.',
      },
      {
        id: 'moon-deimos',
        name: 'Deimos',
        diameter: '12,4 km',
        orbitalPeriod: '30,3 horas',
        summary:
          'Pequena lua irregular e escura na órbita externa marciana, possivelmente um asteroide capturado pela gravidade.',
      },
    ],
  },
  {
    id: 'jupiter',
    scale: 'solar',
    name: 'Júpiter',
    classification: 'Gigante Gasoso',
    cosmicAddress: '5ª Órbita · Sistema Solar · Braço de Órion · Via Láctea',
    distanceFromEarth: {
      ua: '4,2 a 6,2 UA (5,20 UA do Sol)',
      lightYears: '0,000082 al (~43 min de luz)',
      parsecs: '0,0000252 pc',
    },
    curiosities: [
      'É o maior planeta do Sistema Solar: possui mais do dobro da massa de todos os outros sete planetas combinados.',
      'Sua Grande Mancha Vermelha é uma tempestade anticiclônica maior que o planeta Terra, ativa há séculos.',
    ],
    hoverHint: 'Órbita 5,20 UA · Luas Europa, Io e Ganimedes',
    color: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.55)',
    secondaryColor: '#D97706',
    radius: 15.5,
    orbitRadius: 234,
    orbitSpeed: 0.21,
    initialAngle: -2.15,
    visualType: 'planet',
    orbitalPeriodLabel: '11,86 anos terrestres',
    prominentMoons: [
      {
        id: 'moon-europa',
        name: 'Europa',
        diameter: '3.121 km',
        orbitalPeriod: '3,55 dias',
        summary:
          'Coberta por uma crosta lisa de gelo que esconde um vasto oceano salgado subterrâneo — um dos maiores alvos na busca por vida fora da Terra.',
        clickableBodyId: 'europa',
      },
      {
        id: 'moon-io',
        name: 'Io',
        diameter: '3.643 km',
        orbitalPeriod: '1,77 dia',
        summary:
          'O corpo com maior atividade vulcânica de todo o Sistema Solar, aquecido pelas intensas forças de maré de Júpiter.',
        clickableBodyId: 'io',
      },
      {
        id: 'moon-ganimedes',
        name: 'Ganimedes',
        diameter: '5.268 km',
        orbitalPeriod: '7,15 dias',
        summary:
          'A maior lua do Sistema Solar — supera Mercúrio em tamanho e é a única lua conhecida com campo magnético próprio.',
      },
    ],
  },
  {
    id: 'europa',
    scale: 'solar',
    name: 'Europa',
    classification: 'Lua Galileana de Júpiter',
    cosmicAddress: 'Órbita de Júpiter · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '~5,20 UA (média)',
      lightYears: '0,000082 al (~43 min de luz)',
      parsecs: '0,0000252 pc',
    },
    curiosities: [
      'Sob sua casca congelada rachada por linhas avermelhadas, estima-se existir um oceano líquido global com o dobro de água de todos os oceanos da Terra.',
      'A missão Europa Clipper foi projetada especificamente para investigar se esse oceano oculto possui condições favoráveis à vida.',
    ],
    hoverHint: 'Lua de Júpiter · Oceano sob crosta de gelo',
    color: '#BAE6FD',
    glowColor: 'rgba(186, 230, 253, 0.65)',
    radius: 3.6,
    orbitRadius: 28,
    orbitSpeed: 2.35,
    initialAngle: 0.4,
    parentBodyId: 'jupiter',
    visualType: 'moon',
    orbitalPeriodLabel: '3,55 dias ao redor de Júpiter',
  },
  {
    id: 'io',
    scale: 'solar',
    name: 'Io',
    classification: 'Lua Galileana de Júpiter',
    cosmicAddress: 'Órbita de Júpiter · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '~5,20 UA (média)',
      lightYears: '0,000082 al (~43 min de luz)',
      parsecs: '0,0000252 pc',
    },
    curiosities: [
      'Possui mais de 400 vulcões ativos que lançam plumas de enxofre a centenas de quilômetros de altitude.',
      'Sua superfície amarelada e alaranjada é constantemente remodelada pela lava e por depósitos sulfurosos.',
    ],
    hoverHint: 'Lua de Júpiter · Mundo mais vulcânico',
    color: '#FDE047',
    glowColor: 'rgba(253, 224, 71, 0.58)',
    radius: 3.2,
    orbitRadius: 21,
    orbitSpeed: 3.55,
    initialAngle: 3.6,
    parentBodyId: 'jupiter',
    visualType: 'moon',
    orbitalPeriodLabel: '1,77 dia ao redor de Júpiter',
  },
  {
    id: 'saturno',
    scale: 'solar',
    name: 'Saturno',
    classification: 'Gigante Gasoso com Anéis',
    cosmicAddress: '6ª Órbita · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '8,5 a 10,5 UA (9,54 UA do Sol)',
      lightYears: '0,000151 al (~1h 19min de luz)',
      parsecs: '0,0000462 pc',
    },
    curiosities: [
      'Seus icônicos anéis se estendem por mais de 280.000 km de largura, mas têm espessura média de apenas algumas dezenas de metros.',
      'Sua densidade média é menor que a da água líquida — é o planeta menos denso do Sistema Solar.',
    ],
    hoverHint: 'Órbita 9,54 UA · Anéis de gelo e lua Titã',
    color: '#FDE68A',
    glowColor: 'rgba(253, 230, 138, 0.5)',
    secondaryColor: '#D4A373',
    radius: 12.5,
    orbitRadius: 298,
    orbitSpeed: 0.145,
    initialAngle: 0.55,
    hasRings: true,
    ringColor: 'rgba(253, 230, 138, 0.45)',
    visualType: 'planet',
    orbitalPeriodLabel: '29,45 anos terrestres',
    prominentMoons: [
      {
        id: 'moon-tita',
        name: 'Titã',
        diameter: '5.149 km',
        orbitalPeriod: '15,95 dias',
        summary:
          'Única lua do Sistema Solar com atmosfera densa e lagos líquidos na superfície — porém compostos de metano e etano líquidos.',
        clickableBodyId: 'tita',
      },
      {
        id: 'moon-encelado',
        name: 'Encélado',
        diameter: '504 km',
        orbitalPeriod: '1,37 dia',
        summary:
          'Lua gelada brilhante que ejeta gêiseres de vapor d’água de seu polo sul, alimentando um dos anéis externos de Saturno.',
      },
    ],
  },
  {
    id: 'tita',
    scale: 'solar',
    name: 'Titã',
    classification: 'Maior Lua de Saturno',
    cosmicAddress: 'Órbita de Saturno · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '~9,54 UA (média)',
      lightYears: '0,000151 al (~1h 19min de luz)',
      parsecs: '0,0000462 pc',
    },
    curiosities: [
      'Possui um ciclo climático semelhante ao da água na Terra, com nuvens, chuvas, rios e mares de hidrocarbonetos líquidos.',
      'É maior que o planeta Mercúrio e recebeu em 2005 o pouso histórico da sonda Huygens.',
    ],
    hoverHint: 'Lua de Saturno · Atmosfera densa e lagos de metano',
    color: '#FDBA74',
    glowColor: 'rgba(253, 186, 116, 0.58)',
    radius: 3.5,
    orbitRadius: 29,
    orbitSpeed: 1.9,
    initialAngle: 2.1,
    parentBodyId: 'saturno',
    visualType: 'moon',
    orbitalPeriodLabel: '15,95 dias ao redor de Saturno',
  },
  {
    id: 'urano',
    scale: 'solar',
    name: 'Urano',
    classification: 'Gigante de Gelo',
    cosmicAddress: '7ª Órbita · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '18,2 a 20,2 UA (19,2 UA do Sol)',
      lightYears: '0,000304 al (~2h 40min de luz)',
      parsecs: '0,000093 pc',
    },
    curiosities: [
      'Gira quase completamente "deitado", com inclinação axial de cerca de 98°, provocando estações extremas que duram 21 anos cada.',
      'Sua tonalidade azul-ciano suave vem do gás metano na alta atmosfera, que absorve a luz vermelha do Sol.',
    ],
    hoverHint: 'Órbita 19,2 UA · Rotação inclinada a 98°',
    color: '#67E8F9',
    glowColor: 'rgba(103, 232, 249, 0.52)',
    radius: 9.8,
    orbitRadius: 356,
    orbitSpeed: 0.1,
    initialAngle: -1.1,
    visualType: 'planet',
    orbitalPeriodLabel: '84 anos terrestres',
    prominentMoons: [
      {
        id: 'moon-titania',
        name: 'Titânia',
        diameter: '1.578 km',
        orbitalPeriod: '8,7 dias',
        summary: 'A maior lua de Urano, cortada por enormes cânions tectônicos formados quando seu interior congelou.',
      },
    ],
  },
  {
    id: 'netuno',
    scale: 'solar',
    name: 'Netuno',
    classification: 'Gigante de Gelo Externo',
    cosmicAddress: '8ª Órbita · Sistema Solar · Braço de Órion · Via Láctea',
    distanceFromEarth: {
      ua: '29,1 a 31,1 UA (30,1 UA do Sol)',
      lightYears: '0,000476 al (~4h 10min de luz)',
      parsecs: '0,000146 pc',
    },
    curiosities: [
      'Foi o primeiro planeta descoberto por cálculos matemáticos antes mesmo de ser observado em telescópio, em 1846.',
      'Registra os ventos supersônicos mais rápidos do Sistema Solar, ultrapassando 2.000 km/h em sua atmosfera azul profunda.',
    ],
    hoverHint: 'Órbita 30,1 UA · Lua Tritão em órbita retrógrada',
    color: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.62)',
    secondaryColor: '#3B82F6',
    radius: 9.6,
    orbitRadius: 412,
    orbitSpeed: 0.072,
    initialAngle: 2.55,
    visualType: 'planet',
    orbitalPeriodLabel: '164,8 anos terrestres',
    prominentMoons: [
      {
        id: 'moon-tritao',
        name: 'Tritão',
        diameter: '2.707 km',
        orbitalPeriod: '5,88 dias (retrógrada)',
        summary:
          'Gira no sentido oposto à rotação de Netuno, indício de que foi capturado do Cinturão de Kuiper; possui gêiseres de nitrogênio congelado.',
        clickableBodyId: 'tritao',
      },
    ],
  },
  {
    id: 'tritao',
    scale: 'solar',
    name: 'Tritão',
    classification: 'Maior Lua de Netuno',
    cosmicAddress: 'Órbita de Netuno · Sistema Solar · Braço de Órion',
    distanceFromEarth: {
      ua: '~30,1 UA (média)',
      lightYears: '0,000476 al (~4h 10min de luz)',
      parsecs: '0,000146 pc',
    },
    curiosities: [
      'É a única grande lua do Sistema Solar com órbita retrógrada (gira ao contrário da rotação do seu planeta).',
      'Com superfície a -235 °C, é um dos lugares mais frios já medidos no Sistema Solar e ainda apresenta criovulcões ativos.',
    ],
    hoverHint: 'Lua de Netuno · Órbita retrógrada gelada',
    color: '#A5F3FC',
    glowColor: 'rgba(165, 243, 252, 0.58)',
    radius: 3.3,
    orbitRadius: 22,
    orbitSpeed: -2.2, // Retrograde orbit!
    initialAngle: -0.7,
    parentBodyId: 'netuno',
    visualType: 'moon',
    orbitalPeriodLabel: '5,88 dias (retrógrada)',
  },

  // ================= ESCALA VIA LÁCTEA =================
  {
    id: 'sagitario-a',
    scale: 'milkyway',
    name: 'Sagitário A*',
    classification: 'Buraco Negro Supermassivo',
    cosmicAddress: 'Núcleo Central · Via Láctea · Grupo Local',
    distanceFromEarth: {
      ua: '~1,64 bilhão de UA',
      lightYears: '26.000 anos-luz',
      parsecs: '~7.975 parsecs (~8 kpc)',
    },
    curiosities: [
      'Concentra uma massa equivalente a cerca de 4 milhões de sóis em uma região menor que a órbita de Mercúrio.',
      'Sua primeira imagem direta da sombra do horizonte de eventos foi revelada em 2022 pelo projeto Event Horizon Telescope.',
    ],
    hoverHint: 'Centro da Via Láctea · 4 milhões de massas solares',
    color: '#FCD34D',
    glowColor: 'rgba(252, 211, 77, 0.78)',
    radius: 17,
    x: 0,
    y: 0,
    visualType: 'blackhole',
  },
  {
    id: 'sistema-solar-mw',
    scale: 'milkyway',
    name: 'Sistema Solar (Braço de Órion)',
    classification: 'Sistema Planetário em Braço Espiral',
    cosmicAddress: 'Braço de Órion · Via Láctea · Grupo Local',
    distanceFromEarth: {
      ua: '0 a 30 UA (Nosso lar)',
      lightYears: '0 al (26.000 al do centro galáctico)',
      parsecs: '0 pc (~8 kpc do centro)',
    },
    curiosities: [
      'Ficamos numa região tranquila a meio caminho entre o núcleo turbulento e a borda externa da Via Láctea.',
      'Viajamos ao redor do centro galáctico a cerca de 828.000 km/h, completando uma volta a cada 230 milhões de anos.',
    ],
    hoverHint: 'Nosso endereço galáctico · 26.000 al do centro',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    radius: 11,
    x: 0.04,
    y: 0.44,
    visualType: 'marker',
  },
  {
    id: 'proxima-centauri',
    scale: 'milkyway',
    name: 'Próxima Centauri',
    classification: 'Estrela Anã Vermelha (Sistema Alpha Centauri)',
    cosmicAddress: 'Vizinhança Solar · Braço de Órion · Via Láctea',
    distanceFromEarth: {
      ua: '268.400 UA',
      lightYears: '4,24 anos-luz',
      parsecs: '1,30 parsec',
    },
    curiosities: [
      'É a estrela mais próxima do Sol, mas por ser uma anã vermelha pequena e pouco luminosa, não pode ser vista a olho nu da Terra.',
      'Possui ao menos um exoplaneta confirmado na zona habitável, chamado Próxima Centauri b.',
    ],
    hoverHint: 'Estrela mais próxima · 4,24 anos-luz',
    color: '#FB7185',
    glowColor: 'rgba(251, 113, 133, 0.65)',
    radius: 8,
    x: 0.16,
    y: 0.39,
    visualType: 'star',
  },
  {
    id: 'nebulosa-orion',
    scale: 'milkyway',
    name: 'Nebulosa de Órion (M42)',
    classification: 'Região de Formação Estelar',
    cosmicAddress: 'Braço de Órion · Via Láctea · Grupo Local',
    distanceFromEarth: {
      ua: '~85 milhões de UA',
      lightYears: '1.344 anos-luz',
      parsecs: '~412 parsecs',
    },
    curiosities: [
      'É o grande berçário estelar mais próximo da Terra, onde centenas de novas estrelas e discos protoplanetários estão nascendo agora.',
      'Tem cerca de 24 anos-luz de largura e pode ser vista facilmente a olho nu como uma pequena mancha difusa na constelação de Órion.',
    ],
    hoverHint: 'Berçário estelar · 1.344 anos-luz',
    color: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.68)',
    radius: 10,
    x: -0.17,
    y: 0.51,
    visualType: 'nebula',
  },
  {
    id: 'braco-perseu',
    scale: 'milkyway',
    name: 'Braço de Perseu',
    classification: 'Um dos Dois Braços Espirais Principais',
    cosmicAddress: 'Disco Externo · Via Láctea · Grupo Local',
    distanceFromEarth: {
      ua: '~405 milhões de UA',
      lightYears: '~6.400 anos-luz (da Terra)',
      parsecs: '~1.960 parsecs (~2 kpc)',
    },
    curiosities: [
      'Junto ao Braço de Escudo-Centauro, forma a estrutura espiral dominante que envolve a barra central da Via Láctea.',
      'Reúne aglomerados estelares jovens, estrelas supergigantes azuis e vastas nuvens de hidrogênio ionizado.',
    ],
    hoverHint: 'Braço espiral principal externo · ~6.400 al',
    color: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.62)',
    radius: 9.5,
    x: -0.46,
    y: 0.34,
    visualType: 'nebula',
  },

  // ================= ESCALA GRUPO LOCAL =================
  {
    id: 'via-lactea-lg',
    scale: 'localgroup',
    name: 'Via Láctea',
    classification: 'Galáxia Espiral Barrada (SBbc)',
    cosmicAddress: 'Grupo Local · Superaglomerado de Laniakea · Universo Observável',
    distanceFromEarth: {
      ua: '0 UA (Nossa galáxia)',
      lightYears: '100.000 anos-luz de diâmetro',
      parsecs: '~30,7 quiloparsecs de diâmetro',
    },
    curiosities: [
      'É a segunda maior galáxia do Grupo Local em diâmetro, mas sua massa total (incluindo matéria escura) rivaliza com a de Andrômeda.',
      'É cercada por dezenas de galáxias anãs satélites ligadas à sua gravidade, como as Nuvens de Magalhães.',
    ],
    hoverHint: 'Nossa galáxia · ~100.000 anos-luz de diâmetro',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.68)',
    radius: 34,
    x: -0.34,
    y: 0.16,
    visualType: 'spiral_galaxy',
  },
  {
    id: 'andromeda-lg',
    scale: 'localgroup',
    name: 'Galáxia de Andrômeda (M31)',
    classification: 'Galáxia Espiral Gigante (SA(s)b)',
    cosmicAddress: 'Grupo Local · Superaglomerado de Laniakea · Universo Observável',
    distanceFromEarth: {
      ua: '~160,6 bilhões de UA',
      lightYears: '2,54 milhões de anos-luz',
      parsecs: '~778.000 parsecs (~0,78 Mpc)',
    },
    curiosities: [
      'É a maior galáxia do Grupo Local, com cerca de 220.000 anos-luz de diâmetro e aproximadamente 1 trilhão de estrelas.',
      'Aproxima-se da Via Láctea a 110 km/s e formará conosco uma nova galáxia elíptica gigante em ~4,5 bilhões de anos.',
    ],
    hoverHint: 'Maior galáxia do Grupo Local · 2,54 milhões al',
    color: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.72)',
    radius: 46,
    x: 0.28,
    y: -0.18,
    visualType: 'spiral_galaxy',
  },
  {
    id: 'triangulo-lg',
    scale: 'localgroup',
    name: 'Galáxia do Triângulo (M33)',
    classification: 'Galáxia Espiral (SA(s)cd)',
    cosmicAddress: 'Grupo Local · Superaglomerado de Laniakea · Universo Observável',
    distanceFromEarth: {
      ua: '~172,7 bilhões de UA',
      lightYears: '2,73 milhões de anos-luz',
      parsecs: '~837.000 parsecs (~0,84 Mpc)',
    },
    curiosities: [
      'É a terceira maior galáxia do Grupo Local, com cerca de 40 bilhões de estrelas e intensa taxa de formação estelar.',
      'Provavelmente é ligada gravitacionalmente a Andrômeda e poderá participar da futura fusão com a Via Láctea.',
    ],
    hoverHint: '3ª maior do Grupo Local · 2,73 milhões al',
    color: '#7DD3FC',
    glowColor: 'rgba(125, 211, 252, 0.64)',
    radius: 24,
    x: 0.44,
    y: 0.28,
    visualType: 'spiral_galaxy',
  },
  {
    id: 'gnm-lg',
    scale: 'localgroup',
    name: 'Grande Nuvem de Magalhães',
    classification: 'Galáxia Satélite Irregular',
    cosmicAddress: 'Órbita da Via Láctea · Grupo Local · Laniakea',
    distanceFromEarth: {
      ua: '~10,3 bilhões de UA',
      lightYears: '163.000 anos-luz',
      parsecs: '~50.000 parsecs (50 kpc)',
    },
    curiosities: [
      'Visível a olho nu no hemisfério sul (incluindo o Brasil) sob céus escuros, parece uma pequena nuvem luminosa desprendida da Via Láctea.',
      'Abriga a Nebulosa da Tarântula, a região de formação de estrelas mais ativa de todo o Grupo Local.',
    ],
    hoverHint: 'Satélite irregular da Via Láctea · 163.000 al',
    color: '#FCD34D',
    glowColor: 'rgba(252, 211, 77, 0.58)',
    radius: 15,
    x: -0.52,
    y: 0.44,
    visualType: 'irregular_galaxy',
  },
];

// Exatamente 10 questões de Ciências — 9º Ano (alinhadas à BNCC):
// 3 sobre Galáxias e Via Láctea
// 3 sobre Organização do Universo
// 4 sobre Unidade Astronômica, Ano-luz e Parsec
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- 3 Questões: Galáxias e Via Láctea (9º Ano) ---
  {
    id: 1,
    category: 'Galáxias e Via Láctea',
    question:
      'Ao observar o céu noturno longe das luzes da cidade, vemos uma faixa esbranquiçada atravessando o céu: é a Via Láctea vista de dentro. Do ponto de vista astronômico, o que é a Via Láctea e qual é o seu formato?',
    options: [
      'Um pequeno conjunto de planetas gasosos em formato elíptico.',
      'Uma galáxia do tipo espiral barrada, formada por bilhões de estrelas, gás, poeira e matéria escura unidos pela gravidade.',
      'Uma nebulosa irregular que abriga apenas o Sol e seus oito planetas.',
      'Um cometa gigante de gelo e poeira cósmica que cruza o Sistema Solar.',
    ],
    correctIndex: 1,
    explanation:
      'A Via Láctea é uma galáxia espiral barrada com cerca de 100.000 anos-luz de diâmetro e entre 100 e 400 bilhões de estrelas, todas mantidas unidas pela força gravitacional.',
  },
  {
    id: 2,
    category: 'Galáxias e Via Láctea',
    question:
      'Em uma atividade de Ciências do 9º ano, a turma precisava indicar no mapa da Via Láctea onde está o Sistema Solar e o que existe no centro da nossa galáxia. Qual afirmação está correta?',
    options: [
      'O Sistema Solar fica exatamente no centro da Via Láctea, cercado por planetas anões.',
      'O Sistema Solar fica fora da Via Láctea, orbitando a Galáxia de Andrômeda.',
      'O Sistema Solar fica no Braço de Órion (a cerca de 26.000 anos-luz do centro), e no núcleo galáctico existe o buraco negro supermassivo Sagitário A*.',
      'O Sistema Solar fica na borda de uma galáxia elíptica cujo centro é ocupado pela estrela Próxima Centauri.',
    ],
    correctIndex: 2,
    explanation:
      'Nosso Sistema Solar está localizado no Braço de Órion, a aproximadamente 26.000 anos-luz do centro da Via Láctea, onde se encontra o buraco negro supermassivo Sagitário A*.',
  },
  {
    id: 3,
    category: 'Galáxias e Via Láctea',
    question:
      'Os astrônomos classificam as galáxias principalmente por sua forma: espiral, elíptica ou irregular. Qual opção associa corretamente um tipo de galáxia à sua característica principal?',
    options: [
      'Galáxias elípticas possuem braços espirais bem definidos e formam muitas estrelas jovens azuladas.',
      'Galáxias irregulares têm formato esférico perfeito e praticamente não possuem nuvens de gás.',
      'Galáxias elípticas são sempre menores que o Sistema Solar e não têm atração gravitacional.',
      'Galáxias espirais apresentam disco giratório com braços luminosos ricos em gás e poeira, onde nascem muitas estrelas novas.',
    ],
    correctIndex: 3,
    explanation:
      'Galáxias espirais (como a Via Láctea e Andrômeda) têm braços ricos em gás e poeira com intensa formação estelar; elípticas têm formato ovalado com estrelas mais antigas, e irregulares não possuem simetria definida.',
  },

  // --- 3 Questões: Organização do Universo (9º Ano) ---
  {
    id: 4,
    category: 'Organização do Universo',
    question:
      'Imagine escrever um "endereço cósmico" completo da Terra no universo, começando da menor estrutura até a maior. Qual sequência apresenta a ordem crescente correta?',
    options: [
      'Terra → Sistema Solar → Braço de Órion → Via Láctea → Grupo Local → Superaglomerado de Laniakea → Universo Observável.',
      'Terra → Braço de Órion → Sistema Solar → Grupo Local → Via Láctea → Universo Observável → Laniakea.',
      'Sistema Solar → Terra → Via Láctea → Braço de Órion → Laniakea → Grupo Local → Universo Observável.',
      'Terra → Via Láctea → Sistema Solar → Grupo Local → Braço de Órion → Laniakea → Universo Observável.',
    ],
    correctIndex: 0,
    explanation:
      'Cada nível está contido no seguinte: a Terra integra o Sistema Solar, no Braço de Órion da Via Láctea; nossa galáxia faz parte do Grupo Local, dentro do Superaglomerado de Laniakea, no Universo Observável.',
  },
  {
    id: 5,
    category: 'Organização do Universo',
    question:
      'A Via Láctea não está sozinha no espaço: ela pertence a um aglomerado gravitacional com cerca de 80 galáxias. Como se chama esse conjunto e qual é a maior galáxia vizinha que faz parte dele?',
    options: [
      'Cinturão de Asteroides; Galáxia Sombrero.',
      'Braço de Perseu; Nebulosa de Órion.',
      'Grupo Local; Galáxia de Andrômeda (M31).',
      'Sistema Solar; Próxima Centauri.',
    ],
    correctIndex: 2,
    explanation:
      'A Via Láctea integra o Grupo Local, um aglomerado de cerca de 80 galáxias dominado por duas grandes espirais: a Via Láctea e a Galáxia de Andrômeda (M31), situada a 2,54 milhões de anos-luz.',
  },
  {
    id: 6,
    category: 'Organização do Universo',
    question:
      'Comparando as grandes escalas do cosmos estudadas no 9º ano, qual alternativa descreve corretamente o Superaglomerado de Laniakea e o Universo Observável?',
    options: [
      'Laniakea é o conjunto de apenas oito planetas ao redor do Sol, e o Universo Observável mede 100.000 anos-luz.',
      'Laniakea reúne cerca de 100.000 galáxias (incluindo o Grupo Local), e o Universo Observável é toda a região cuja luz já teve tempo de chegar até nós (~93 bilhões de anos-luz de diâmetro).',
      'O Universo Observável é menor que a Via Láctea, pois nossos telescópios só conseguem observar o Braço de Órion.',
      'Laniakea é o nome dado à camada atmosférica que protege a Terra dos raios solares.',
    ],
    correctIndex: 1,
    explanation:
      'O Superaglomerado de Laniakea é uma imensa estrutura com cerca de 100.000 galáxias, enquanto o Universo Observável abrange toda a esfera do espaço cuja luz conseguiu alcançar a Terra desde o Big Bang.',
  },

  // --- 4 Questões: Medidas Astronômicas (9º Ano — conceitos e cálculos práticos) ---
  {
    id: 7,
    category: 'Medidas Astronômicas',
    question:
      'A Unidade Astronômica (UA) corresponde à distância média entre a Terra e o Sol (~150 milhões de km). Sabendo que Netuno fica a cerca de 30 UA do Sol, por que usamos a UA no Sistema Solar e quantos quilômetros aproximadamente separam Netuno do Sol?',
    options: [
      'Usamos UA para simplificar distâncias planetárias; Netuno está a cerca de 4,5 bilhões de km do Sol (30 × 150 milhões).',
      'Usamos UA apenas para medir a temperatura dos planetas; Netuno está a 30 milhões de km do Sol.',
      'Usamos UA para medir o tempo de rotação da Lua; Netuno está a 150 milhões de km do Sol.',
      'Usamos UA somente para medir outras galáxias; Netuno está a 30 anos-luz do Sol.',
    ],
    correctIndex: 0,
    explanation:
      'Como 1 UA ≈ 150 milhões de km, multiplicar 30 × 150 milhões resulta em cerca de 4,5 bilhões de km. Usar UA evita números enormes e facilita comparar as órbitas dentro do Sistema Solar.',
  },
  {
    id: 8,
    category: 'Medidas Astronômicas',
    question:
      'A estrela Próxima Centauri está a 4,24 anos-luz da Terra. Em Ciências, o que a unidade "ano-luz" realmente mede e o que isso significa quando observamos a luz dessa estrela hoje?',
    options: [
      'Mede tempo; significa que Próxima Centauri tem exatamente 4,24 anos de idade.',
      'Mede velocidade; significa que a estrela dá 4,24 voltas ao redor da Terra por ano.',
      'Mede massa; significa que a estrela é 4,24 vezes mais pesada que o Sol.',
      'Mede distância; significa que a luz que enxergamos hoje partiu de Próxima Centauri há 4,24 anos.',
    ],
    correctIndex: 3,
    explanation:
      'Apesar de trazer a palavra "ano", o ano-luz é uma unidade de DISTÂNCIA (~9,46 trilhões de km percorridos pela luz em 1 ano). Por isso, observar astros distantes é sempre observar como eles eram no passado.',
  },
  {
    id: 9,
    category: 'Medidas Astronômicas',
    question:
      'A luz percorre o vácuo a cerca de 300.000 km por segundo, e o Sol está a aproximadamente 150 milhões de km da Terra (1 UA). Se o Sol se apagasse de repente agora, em quanto tempo aproximadamente notaríamos a escuridão na Terra?',
    options: [
      'Instantaneamente, em 0 segundo, pois a luz não leva tempo para atravessar o espaço.',
      'Em cerca de 1,3 segundo, o mesmo tempo que a luz leva para viajar da Lua até a Terra.',
      'Em cerca de 8 minutos e 20 segundos.',
      'Somente após 1 ano inteiro, pois a distância da Terra ao Sol equivale a 1 ano-luz.',
    ],
    correctIndex: 2,
    explanation:
      'Dividindo 150.000.000 km por 300.000 km/s, encontramos 500 segundos — cerca de 8 minutos e 20 segundos! Já 1,3 segundo é o tempo que a luz leva para percorrer a distância da Lua até a Terra.',
  },
  {
    id: 10,
    category: 'Medidas Astronômicas',
    question:
      'Muito usado por astrônomos profissionais para grandes distâncias, 1 parsec (pc) equivale a aproximadamente 3,26 anos-luz. Se uma estrela observada por um telescópio está a 10 parsecs da Terra, qual é a sua distância aproximada em anos-luz?',
    options: [
      'Aproximadamente 3,26 anos-luz.',
      'Aproximadamente 32,6 anos-luz.',
      'Aproximadamente 13,26 anos-luz.',
      'Aproximadamente 326 anos-luz.',
    ],
    correctIndex: 1,
    explanation:
      'Como cada 1 parsec equivale a cerca de 3,26 anos-luz, basta multiplicar 10 × 3,26 = 32,6 anos-luz. Essa equivalência é fundamental para converter distâncias em catálogos astronômicos.',
  },
];

export function getSpaceRank(score: number): SpaceRank {
  if (score >= 9) {
    return {
      title: 'Astrofísico Mestre',
      subtitle: 'Domínio excepcional do cosmos',
      description:
        'Você domina nosso endereço cósmico com precisão científica — das órbitas do Sistema Solar às escalas de parsecs e superaglomerados.',
      accentClass: 'text-amber-300',
    };
  }
  if (score >= 7) {
    return {
      title: 'Comandante Galáctico',
      subtitle: 'Excelente navegação estelar',
      description:
        'Sua leitura de galáxias, escalas cósmicas e medidas astronômicas coloca você no comando de grandes expedições interestelares.',
      accentClass: 'text-sky-300',
    };
  }
  if (score >= 4) {
    return {
      title: 'Navegador Estelar',
      subtitle: 'Boa orientação no universo',
      description:
        'Você já conhece os marcos essenciais da Via Láctea e das distâncias cósmicas. Revisite o Explorador e o Conversor para alcançar a maestria!',
      accentClass: 'text-indigo-300',
    };
  }
  return {
    title: 'Cadete Espacial',
    subtitle: 'Início promissor da jornada',
    description:
      'Toda grande expedição começa pelo primeiro passo. Explore os 7 níveis do endereço cósmico e tente novamente para subir de patente!',
    accentClass: 'text-sky-200',
  };
}
