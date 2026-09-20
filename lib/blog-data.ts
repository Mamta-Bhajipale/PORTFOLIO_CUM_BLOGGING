export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
  readTime: string;
}

export interface BlogCategory {
  slug: "health" | "travel";
  title: string;
  description: string;
  previewTitles: string[];
  posts: BlogPost[];
}

const healthPosts: BlogPost[] = [
  {
    slug: "phc-screening-camp",
    title: "What Really Happens at a PHC-Level Screening Camp",
    date: "2024-11-15",
    excerpt:
      "Organizing a community eye camp taught me more about grassroots healthcare delivery than any textbook.",
    readTime: "5 min read",
    content: [
      "On paper, a screening camp looks straightforward. A room, some equipment, a few health workers, and a community that shows up. In reality, every camp is a small logistics operation that reveals the true state of a health system at its most grassroots level.",
      "I was part of coordinating a community-based eye-screening camp during my NHM internship in Maharashtra. The objective was simple \u2014 screen residents for cataracts and other visual impairments, and refer those needing specialized care to the nearest tertiary facility.",
      "We set up in the PHC courtyard. By 9 AM, the first group of elderly residents had already arrived, some walking over two kilometers. Most had never had an eye exam. Several were already experiencing significant vision loss but had normalized it as part of aging.",
      "The screening itself was conducted by an ophthalmic assistant with a portable slit lamp and a basic visual acuity chart. In three hours, we screened 50+ individuals. Seven were referred for suspected cataracts. One had early glaucoma that would have gone completely undetected.",
      "What struck me most was not the clinical findings but the systemic gaps the camp exposed. Referral pathways were unclear. Transportation to the district hospital was a challenge. Follow-up mechanisms barely existed. The camp created a moment of contact \u2014 but sustaining that contact was where the real work began.",
      "A screening camp is not a solution. It is a diagnostic tool for the health system itself. It shows you where people are, what they need, and how far the system still has to go to reach them.",
    ],
  },
  {
    slug: "vhsnc-reestablishment",
    title: "Lessons from VHSNC Re-establishment in Rural Maharashtra",
    date: "2024-10-02",
    excerpt:
      "When Village Health committees stop functioning, the community loses its voice in the health system.",
    readTime: "6 min read",
    content: [
      "Village Health, Sanitation and Nutrition Committees (VHSNCs) are meant to be the bridge between communities and the public health system. When they function well, they hold the PHC accountable. When they don't, that accountability disappears.",
      "During my NHM internship, one of my key assignments was to re-establish regular VHSNC meetings in several villages that had not convened in months. The reasons for the lapse were familiar \u2014 staff transfers, lack of chairperson motivation, no administrative follow-up.",
      "The first meeting I facilitated was in a village of about 800 people. Only 6 of the 15 committee members showed up. The Anganwadi worker was present. The ASHA was not. The PHC Medical Officer had not been informed.",
      "I started by simply asking what the committee remembered about its role. The answers were vague. Most members had been appointed but never oriented. They did not know they could demand services. They did not know they could track immunization coverage or flag nutrition deficiencies in their village.",
      "Over the next three meetings, we built a routine. Fixed dates. Fixed agenda items. A simple tracking sheet for action items. Slowly, participation grew. The ASHA started attending. The Medical Officer sent a representative. By the fourth meeting, community members were raising concerns about water quality and sanitation that had not been on anyone's radar.",
      "The lesson was clear: a committee on paper is not a committee in practice. Governance structures in health systems need continuous nurturing \u2014 orientation, follow-up, and someone who treats community engagement as a process, not an event.",
    ],
  },
  {
    slug: "asha-anm-dynamics",
    title: "Understanding ASHA-ANM Dynamics on the Ground",
    date: "2024-08-20",
    excerpt:
      "The interaction between ASHAs and ANMs shapes more of primary healthcare delivery than most program designs acknowledge.",
    readTime: "7 min read",
    content: [
      "ASHAs and ANMs are the two most visible frontline workers in India's primary health system. Their daily interactions \u2014 coordination, information sharing, conflict, support \u2014 determine how smoothly programs actually run at the PHC level.",
      "As part of a research study mapping ASHA-ANM interactions across different health service domains, I spent time observing their working relationships at several PHCs. What I found was a spectrum \u2014 from highly collaborative partnerships to near-complete dysfunction.",
      "At one PHC, the ANM and ASHA had a clear division of labor. The ANM managed the facility. The ASHA managed the community. They met weekly, shared data, and resolved conflicts together. Immunization coverage at this PHC was among the highest in the district.",
      "At another PHC, the relationship had deteriorated after a transfer. The new ANM did not know the ASHAs by name. The ASHAs felt unsupported. Data sharing stopped. When I asked the ANM about the ASHAs, she described them as untrained. When I asked the ASHAs about the ANM, they said she never comes to the field.",
      "These are not personnel problems. They are systems problems. When program design assumes that frontline workers will collaborate without institutional mechanisms to support that collaboration, it creates fragility. One transfer, one conflict, one demotivated worker \u2014 and the entire service delivery chain breaks.",
      "My study recommended structured coordination mechanisms: fixed joint meetings, shared data dashboards, and supervisory frameworks that treat ASHA-ANM coordination as a measurable indicator of PHC performance.",
    ],
  },
];

const travelPosts: BlogPost[] = [
  {
    slug: "gadchiroli-tribal-heartland",
    title: "Budget Guide: Exploring Gadchiroli's Tribal Heartland",
    date: "2024-06-10",
    excerpt:
      "Gadchiroli is not on most tourist maps. That is exactly what makes it worth visiting.",
    readTime: "6 min read",
    content: [
      "Gadchiroli sits in the far eastern corner of Maharashtra, bordering Chhattisgarh. It is one of the most forested districts in the state, home to several tribal communities, and largely untouched by mainstream tourism.",
      "Getting there: The nearest railway station is Gondia, about 3 hours by bus from Gadchiroli town. State transport buses run frequently. If you are coming from Nagpur, it is a 5-hour drive through surprisingly scenic roads.",
      "Where to stay: Budget options in Gadchiroli town are limited but functional. The PWD rest house and a few private lodges offer rooms between 500 and 1200 rupees per night. For something more immersive, ask locally about homestays in villages like Wadsa or Desaiganj.",
      "What to see: The Kapila forest area is stunning during monsoon. The tribal museum in Gadchiroli town gives a solid overview of local Gond and Madia cultures. If you are interested in the socio-political history, the Adivasi cultural centers are worth visiting.",
      "What it is really like: Roads are decent but narrow. Food is simple \u2014 bhakri, pitla, and local greens. Do not expect restaurants or ATMs everywhere. Carry cash. People are warm and curious about visitors.",
      "Budget estimate: 800 to 1500 rupees per day including transport, food, and stay. Gadchiroli rewards the traveler who is comfortable with slow, unplanned experiences.",
    ],
  },
  {
    slug: "nagpur-weekend",
    title: "A Weekend in Nagpur \u2014 Beyond the Oranges",
    date: "2024-04-22",
    excerpt:
      "Nagpur is more than an orange junction. Here is how to spend a genuine weekend there.",
    readTime: "5 min read",
    content: [
      "Nagpur gets dismissed as a transit city. People pass through on their way to somewhere else. But spend a weekend there and you will find a city with real character \u2014 green spaces, good food, and some genuinely interesting day trips.",
      "Day 1 \u2014 The city: Start with Ambazari Lake in the morning. It is peaceful, well-maintained, and locals jog there. For lunch, try the Varhadi thali at a local restaurant near Sitabuldi. In the afternoon, visit the Sitabuldi Fort \u2014 small, historical, and usually uncrowded. Evening at Futala Lake, where the light show is surprisingly decent.",
      "Day 2 \u2014 Day trip: Drive to Ramtek (about 1.5 hours). The Ram Temple on the hilltop has a great view of the surrounding plains. On the way back, stop at Ambala, a small village with a beautiful Jain temple. The road is good and the drive is scenic during monsoon.",
      "Day 3 \u2014 Food and markets: Nagpur's food scene is underrated. Try the Saoji mutton at a local place (it is spicy, be warned). Visit the Mahatma Jyotiba Phule Market for oranges and local produce. The Sitabuldi area has good street shopping for clothes and electronics.",
      "Budget: 1500 to 2500 rupees per day including decent food, local transport, and entry fees. Nagpur is affordable, accessible, and deserves more than a fuel stop.",
    ],
  },
  {
    slug: "jharkhand-hill-country",
    title: "Traveling Through Jharkhand's Hill Country",
    date: "2024-03-05",
    excerpt:
      "Jharkhand's landscapes are dramatic and largely undiscovered by mainstream tourism.",
    readTime: "6 min read",
    content: [
      "Jharkhand is one of India's most underrated travel destinations. Dense forests, rolling hills, waterfalls, and tribal villages \u2014 all without the crowds you would find in Himachal or Uttarakhand.",
      "Getting there: Ranchi is the main entry point, well-connected by train and flight. From Ranchi, Netarhat (about 150 km) is the most accessible hill station. The drive takes about 4 hours and passes through forested terrain that feels like a different world.",
      "Where to stay: Netarhat has a few budget lodges and government rest houses. The Forest Rest House at Netarhat offers basic but clean accommodation with a view. Book through the Jharkhand Tourism website in advance.",
      "What to see: The sunrise point at Netarhat is spectacular \u2014 you can see the entire valley from the ridge. The Betla National Park is about 3 hours away and worth a day trip if you enjoy wildlife. The Jonha Falls near Ranchi is a pleasant half-day excursion.",
      "What it is really like: Jharkhand requires patience. Roads vary from excellent to potholed. Food is simple and largely North Indian / tribal cuisine. English is not widely spoken outside Ranchi. Carry cash, a power bank, and patience.",
      "Budget: 1000 to 2000 rupees per day including transport, food, and stay. Jharkhand rewards the traveler who wants landscapes without the tourist infrastructure \u2014 which is both its charm and its challenge.",
    ],
  },
];

export const blogCategories: BlogCategory[] = [
  {
    slug: "health",
    title: "Health",
    description:
      "Stories from the ground \u2014 real experiences in public health across India's primary care system.",
    previewTitles: [
      "What Really Happens at a PHC-Level Screening Camp",
      "Lessons from VHSNC Re-establishment in Rural Maharashtra",
      "Understanding ASHA-ANM Dynamics on the Ground",
    ],
    posts: healthPosts,
  },
  {
    slug: "travel",
    title: "Travel",
    description:
      "Honest, budget-friendly travel guides \u2014 where to go, how to get there, and what it is really like when you arrive.",
    previewTitles: [
      "Budget Guide: Exploring Gadchiroli's Tribal Heartland",
      "A Weekend in Nagpur \u2014 Beyond the Oranges",
      "Traveling Through Jharkhand's Hill Country",
    ],
    posts: travelPosts,
  },
];
