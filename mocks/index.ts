import { format, isAfter } from 'date-fns';
import ko from 'date-fns/locale/ko';
import faker from 'faker';
import { random } from 'lodash-es';

const createPostSummary = (): PostSummary => {
  const title = faker.lorem.sentence().replace(/.$/, '');
  const date = format(faker.date.past(), "yyyy-MM-dd'T'HH:mm:ssxxx", {
    locale: ko,
  });
  const slug =
    date.substring(0, 10) + '--' + title.toLowerCase().replace(/ /g, '-');
  return {
    slug,
    date,
    title,
  };
};

const createPostSummaries = (): PostSummary[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const data = createPostSummary();
    return {
      ...data,
      tags: random(0, 1) % 2 === 0 ? createTags() : undefined,
    };
  }).sort((a, b) => {
    return isAfter(new Date(a.date), new Date(b.date)) ? -1 : 1;
  });
};

const createTags = (): string[] => {
  return Array.from({ length: random(1, 5) }, () => faker.vehicle.model());
};

const createPostDetail = (): PostDetail => {
  return {
    ...createPostSummary(),
    content: faker.lorem.paragraphs(),
    tags: createTags(),
    preview: faker.image.animals(),
  };
};

const createTagList = (): TagDetail[] => {
  return Array.from({ length: 20 }, () => ({
    name: faker.vehicle.model(),
    count: random(1, 10),
  }));
};

const createPostGroups = (): PostGroup[] => {
  let year = 2021;
  return Array.from({ length: 4 }, () => ({
    year: year--,
    posts: Array.from({ length: random(5, 20) }, () =>
      createPostSummary(),
    ).sort((a, b) => {
      return isAfter(new Date(a.date), new Date(b.date)) ? -1 : 1;
    }),
  }));
};

export const tags: TagDetail[] = [
  { name: 'A4', count: 4 },
  { name: 'Camry', count: 5 },
  { name: 'Civic', count: 6 },
  { name: 'Colorado', count: 4 },
  { name: 'Element', count: 10 },
  { name: 'Golf', count: 10 },
  { name: 'Impala', count: 5 },
  { name: 'Land Cruiser', count: 6 },
  { name: 'Model 3', count: 8 },
  { name: 'Prius', count: 7 },
  { name: 'PT Cruiser', count: 8 },
  { name: 'Ranchero', count: 9 },
  { name: 'Roadster', count: 3 },
  { name: 'Sentra', count: 5 },
  { name: 'Silverado', count: 9 },
  { name: 'Taurus', count: 2 },
  { name: 'Wrangler', count: 1 },
  { name: 'XC90', count: 10 },
];

export const postDetail: PostDetail = {
  slug: '2021-04-30--sit-eveniet-alias-necessitatibus-qui',
  date: '2021-04-30T06:13:26+09:00',
  title: 'Sit eveniet alias necessitatibus qui',
  content:
    'Consectetur iste laborum sit quos consectetur consequatur quia. Recusandae nam autem tempora quam error magni. Commodi optio laboriosam ut omnis delectus consequatur ab ratione dolorum. Quisquam minus dolor corrupti. Aliquid delectus eius vero quia nostrum.\n \rAut sint doloribus. Est impedit adipisci minima optio distinctio. Dicta labore velit natus et. Iusto commodi alias voluptatum quo voluptatem. Et sed impedit distinctio aut dolorem soluta exercitationem eos sed.\n \rNumquam soluta impedit. Et eos ullam id veritatis. Veritatis ea iusto alias.',
  tags: ['Cruze', 'Land Cruiser', 'Land Cruiser', 'Altima', 'Impala'],
  preview: 'http://placeimg.com/640/480/animals',
};

export const postList: Pageable<PostSummary> = {
  data: [
    {
      slug: '2021-09-02--esse-nihil-sed-ut-non-enim-velit-maxime',
      date: '2021-09-02T10:32:37+09:00',
      title: 'Esse nihil sed ut non enim velit maxime',
      tags: ['Charger', 'CTS', 'CX-9', 'Model S'],
    },
    {
      slug: '2021-07-09--laudantium-rerum-distinctio-nesciunt-error-expedita-corrupti-sunt',
      date: '2021-07-09T11:48:21+09:00',
      title:
        'Laudantium rerum distinctio nesciunt error expedita corrupti sunt',
      tags: ['CX-9', 'Camaro', 'Roadster', 'A8', 'Model S'],
      excerpt:
        'Dignissimos autem nisi dolores quia in at assumenda fuga. Laborum autem quasi. Est repudiandae doloremque eos beatae ullam recusandae tenetur. Quae nostrum expedita. Iusto dolor vero.',
    },
    {
      slug: '2021-07-06--est-nisi-delectus-alias-sequi-consectetur-sunt',
      date: '2021-07-06T06:00:37+09:00',
      title: 'Est nisi delectus alias sequi consectetur sunt',
      tags: ['ATS', 'Model T', 'Accord'],
    },
    {
      slug: '2021-07-04--perspiciatis-facilis-inventore-odio-qui-recusandae-aspernatur-quibusdam-nihil',
      date: '2021-07-04T13:44:19+09:00',
      title:
        'Perspiciatis facilis inventore odio qui recusandae aspernatur quibusdam nihil',
      excerpt: 'Dolorum aut et non excepturi officia temporibus beatae et.',
    },
    {
      slug: '2021-06-27--veniam-eligendi-rerum-totam-autem',
      date: '2021-06-27T23:42:15+09:00',
      title: 'Veniam eligendi rerum totam autem',
      tags: ['Ranchero'],
    },
    {
      slug: '2021-05-07--ea-possimus-repellat-est-sit-qui-earum-quaerat-rem-quod',
      date: '2021-05-07T17:35:48+09:00',
      title: 'Ea possimus repellat est sit qui earum quaerat rem quod',
      tags: ['ATS', 'V90', 'Volt'],
    },
    {
      slug: '2021-04-07--repellat-totam-doloremque-sed-eos',
      date: '2021-04-07T10:02:49+09:00',
      title: 'Repellat totam doloremque sed eos',
      tags: ['Explorer'],
    },
    {
      slug: '2021-02-07--totam-voluptas-eius-unde-fugiat-assumenda-ab-corporis-est-eos',
      date: '2021-02-07T08:30:51+09:00',
      title: 'Totam voluptas eius unde fugiat assumenda ab corporis est eos',
      tags: ['Camaro', 'Charger', 'ATS'],
      excerpt:
        'Eum iusto at ipsa voluptas. Illo autem aspernatur et non. Omnis ab eum laboriosam dolore. Eum nobis accusamus esse dolor id nobis totam dolor repellat. Nobis est maiores et veniam alias sit voluptates. Ut impedit quisquam deserunt expedita veritatis qui provident laudantium et.',
    },
    {
      slug: '2020-12-30--labore-deleniti-dolores-nisi-ducimus-blanditiis-et',
      date: '2020-12-30T17:22:23+09:00',
      title: 'Labore deleniti dolores nisi ducimus blanditiis et',
    },
    {
      slug: '2020-12-01--labore-nostrum-repudiandae-cumque',
      date: '2020-12-01T18:24:40+09:00',
      title: 'Labore nostrum repudiandae cumque',
      tags: ['Corvette', 'Wrangler', 'Escalade'],
    },
  ],
  first: true,
  last: false,
  size: 10,
  page: 1,
  totalElements: 25,
  totalPages: 3,
};

export const postGroups: PostGroup[] = [
  {
    year: 2021,
    posts: [
      {
        slug: '2021-08-28--recusandae-et-commodi-enim',
        date: '2021-08-28T14:19:25+09:00',
        title: 'Recusandae et commodi enim',
      },
      {
        slug: '2021-08-12--nisi-fugiat-perferendis-doloremque-aut-quia-dolor-repudiandae',
        date: '2021-08-12T03:34:14+09:00',
        title: 'Nisi fugiat perferendis doloremque aut quia dolor repudiandae',
      },
      {
        slug: '2021-08-04--in-in-soluta-odio-molestias-veniam-quo',
        date: '2021-08-04T05:57:31+09:00',
        title: 'In in soluta odio molestias veniam quo',
      },
      {
        slug: '2021-06-08--suscipit-eos-repudiandae',
        date: '2021-06-08T10:29:53+09:00',
        title: 'Suscipit eos repudiandae',
      },
      {
        slug: '2021-04-16--rerum-assumenda-possimus',
        date: '2021-04-16T03:07:32+09:00',
        title: 'Rerum assumenda possimus',
      },
    ],
  },
  {
    year: 2020,
    posts: [
      {
        slug: '2020-12-31--sit-voluptatum-nobis-ipsa-eius-ut-tempora-aut-praesentium',
        date: '2020-12-31T07:19:38+09:00',
        title: 'Sit voluptatum nobis ipsa eius ut tempora aut praesentium',
      },
      {
        slug: '2020-12-28--numquam-impedit-doloremque-ea-sit-omnis-et-ipsum-aut-soluta',
        date: '2020-12-28T13:08:51+09:00',
        title: 'Numquam impedit doloremque ea sit omnis et ipsum aut soluta',
      },
      {
        slug: '2020-12-25--tempora-recusandae-provident-architecto-architecto-consequatur-debitis-dolor-culpa-quae',
        date: '2020-12-25T10:15:53+09:00',
        title:
          'Tempora recusandae provident architecto architecto consequatur debitis dolor culpa quae',
      },
      {
        slug: '2020-11-19--adipisci-blanditiis-dolorem',
        date: '2020-11-19T19:23:49+09:00',
        title: 'Adipisci blanditiis dolorem',
      },
      {
        slug: '2020-09-25--blanditiis-non-laborum-et-quas-aut-neque-beatae',
        date: '2020-09-25T00:06:56+09:00',
        title: 'Blanditiis non laborum et quas aut neque beatae',
      },
      {
        slug: '2020-06-20--dolor-necessitatibus-voluptas-sint-commodi-numquam-recusandae-est-voluptas-accusamus',
        date: '2020-06-20T20:26:32+09:00',
        title:
          'Dolor necessitatibus voluptas sint commodi numquam recusandae est voluptas accusamus',
      },
      {
        slug: '2020-04-25--eos-doloribus-quod-velit-earum-libero-inventore-omnis',
        date: '2020-04-25T04:31:24+09:00',
        title: 'Eos doloribus quod velit earum libero inventore omnis',
      },
      {
        slug: '2020-04-22--assumenda-molestiae-est-nulla-quidem-expedita-distinctio-ut-nihil',
        date: '2020-04-22T13:25:23+09:00',
        title:
          'Assumenda molestiae est nulla quidem expedita distinctio ut nihil',
      },
      {
        slug: '2020-03-15--saepe-sapiente-quis-voluptatem-eos-aspernatur-laudantium-voluptatem',
        date: '2020-03-15T08:49:28+09:00',
        title:
          'Saepe sapiente quis voluptatem eos aspernatur laudantium voluptatem',
      },
      {
        slug: '2020-02-06--voluptatem-impedit-id-aut-distinctio-dolore-in-rerum-accusantium',
        date: '2020-02-06T20:05:56+09:00',
        title:
          'Voluptatem impedit id aut distinctio dolore in rerum accusantium',
      },
      {
        slug: '2020-01-13--odit-voluptas-vitae-enim-itaque-natus-officia-aperiam-expedita-fugiat',
        date: '2020-01-13T06:30:20+09:00',
        title:
          'Odit voluptas vitae enim itaque natus officia aperiam expedita fugiat',
      },
    ],
  },
  {
    year: 2019,
    posts: [
      {
        slug: '2019-12-27--enim-ducimus-placeat-vero-vitae-id',
        date: '2019-12-27T21:28:05+09:00',
        title: 'Enim ducimus placeat vero vitae id',
      },
      {
        slug: '2019-12-16--veritatis-ratione-et-molestias-culpa-eaque-et-est-quisquam-maiores',
        date: '2019-12-16T12:54:36+09:00',
        title:
          'Veritatis ratione et molestias culpa eaque et est quisquam maiores',
      },
      {
        slug: '2019-12-06--quidem-temporibus-qui-amet-consectetur-natus-sed',
        date: '2019-12-06T18:58:34+09:00',
        title: 'Quidem temporibus qui amet consectetur natus sed',
      },
      {
        slug: '2019-10-11--atque-error-qui-veritatis',
        date: '2019-10-11T00:15:47+09:00',
        title: 'Atque error qui veritatis',
      },
      {
        slug: '2019-08-25--qui-culpa-eum-aut-ut-minus',
        date: '2019-08-25T22:48:55+09:00',
        title: 'Qui culpa eum aut ut minus',
      },
      {
        slug: '2019-08-22--recusandae-quidem-facere-eos-itaque-autem-et-sunt-provident-ut',
        date: '2019-08-22T11:13:50+09:00',
        title: 'Recusandae quidem facere eos itaque autem et sunt provident ut',
      },
      {
        slug: '2019-06-26--qui-ut-esse-in-est-quibusdam-cum',
        date: '2019-06-26T17:10:19+09:00',
        title: 'Qui ut esse in est quibusdam cum',
      },
      {
        slug: '2019-05-27--at-nobis-enim-atque-soluta-cupiditate',
        date: '2019-05-27T17:10:52+09:00',
        title: 'At nobis enim atque soluta cupiditate',
      },
      {
        slug: '2019-05-25--nostrum-et-repellendus-delectus-qui-eaque-sint-nobis-sit',
        date: '2019-05-25T02:07:52+09:00',
        title: 'Nostrum et repellendus delectus qui eaque sint nobis sit',
      },
      {
        slug: '2019-05-06--tempora-porro-est-aspernatur-impedit-eum',
        date: '2019-05-06T22:24:17+09:00',
        title: 'Tempora porro est aspernatur impedit eum',
      },
      {
        slug: '2019-04-18--adipisci-consequuntur-omnis-eos-laudantium-non-odio-ullam-distinctio',
        date: '2019-04-18T14:30:22+09:00',
        title:
          'Adipisci consequuntur omnis eos laudantium non odio ullam distinctio',
      },
      {
        slug: '2019-04-09--dolor-error-consectetur-iure-illum-qui-quidem-a-molestias',
        date: '2019-04-09T17:03:08+09:00',
        title: 'Dolor error consectetur iure illum qui quidem a molestias',
      },
      {
        slug: '2019-03-28--earum-saepe-et',
        date: '2019-03-28T18:05:49+09:00',
        title: 'Earum saepe et',
      },
      {
        slug: '2019-03-21--placeat-et-quasi-qui-eaque',
        date: '2019-03-21T11:37:59+09:00',
        title: 'Placeat et quasi qui eaque',
      },
      {
        slug: '2019-01-29--ea-enim-neque',
        date: '2019-01-29T17:09:56+09:00',
        title: 'Ea enim neque',
      },
      {
        slug: '2019-01-23--voluptates-quia-neque',
        date: '2019-01-23T00:08:57+09:00',
        title: 'Voluptates quia neque',
      },
    ],
  },
  {
    year: 2018,
    posts: [
      {
        slug: '2018-12-20--porro-consequuntur-aliquid',
        date: '2018-12-20T22:22:44+09:00',
        title: 'Porro consequuntur aliquid',
      },
      {
        slug: '2018-12-04--qui-corrupti-itaque',
        date: '2018-12-04T01:11:29+09:00',
        title: 'Qui corrupti itaque',
      },
      {
        slug: '2018-08-27--sint-dolore-molestiae-aperiam-non-quia-occaecati-consequatur-occaecati',
        date: '2018-08-27T17:36:49+09:00',
        title:
          'Sint dolore molestiae aperiam non quia occaecati consequatur occaecati',
      },
      {
        slug: '2018-07-31--voluptas-iusto-vero-qui-quam-eligendi-quia-esse-accusantium',
        date: '2018-07-31T08:24:50+09:00',
        title: 'Voluptas iusto vero qui quam eligendi quia esse accusantium',
      },
      {
        slug: '2018-07-27--incidunt-non-a-dolor-quis-enim-possimus',
        date: '2018-07-27T13:52:07+09:00',
        title: 'Incidunt non a dolor quis enim possimus',
      },
      {
        slug: '2018-04-26--eligendi-id-odit',
        date: '2018-04-26T04:19:58+09:00',
        title: 'Eligendi id odit',
      },
      {
        slug: '2018-01-22--exercitationem-sapiente-nemo-dolor',
        date: '2018-01-22T03:39:16+09:00',
        title: 'Exercitationem sapiente nemo dolor',
      },
    ],
  },
];
