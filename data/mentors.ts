import type { Speaker } from "@/models/speaker"

// PROFILES
import diego_galvez_profile from "@/public/images/mentors/diego_galvez_profile.png"
import laura_gonzalez_profile from "@/public/images/mentors/laura_gonzalez_profile.png"
import daniela_alvarez_profile from "@/public/images/mentors/daniela_alvarez_profile.png"
import javier_villamizar_profile from "@/public/images/mentors/javier_villamizar_profile.png"
import ana_cristina_gadala_profile from "@/public/images/mentors/ana_cristina_gadala_profile.png"
import cristina_kenna_profile from "@/public/images/mentors/cristina_kenna_profile.png"
import freddy_vega_profile from "@/public/images/mentors/freddy_vega_profile.png"
import christian_van_der_henst_profile from "@/public/images/mentors/christian_van_der_henst_profile.png"
import karla_berman_profile from "@/public/images/mentors/karla_berman_profile.png"
import eyal_shats_profile from "@/public/images/mentors/eyal_shats_profile.png"
import adrian_garcia_aranyos_profile from "@/public/images/mentors/adrian_garcia_aranyos_profile.png"
import sarah_alsaleh_profile from "@/public/images/mentors/sarah_alsaleh_profile.png"

import mexOpp from "@/public/images/startups/mexOpp.png"
import stays from "@/public/images/startups/stays.jpeg"
import nazca from "@/public/images/startups/nazca.png"
import softbank from "@/public/images/startups/softbank.png"
import qed_investors from "@/public/images/startups/qed_investors.jpeg"
import platzi from "@/public/images/startups/platzi.png"
import ignia from "@/public/images/startups/ignia.png"
import shark_tank from "@/public/images/startups/shark_tank.png"
import simpli_route from "@/public/images/startups/simpli_route.jpeg"
import endeavorglobal from "@/public/images/startups/endeavorglobal.jpeg"
import outliersvc from "@/public/images/startups/outliersvc.jpeg"

const Mentors: Speaker[] = [
    {
        name: 'Diego Galvez',
        description: 'Founder',
        srcImageProfile: diego_galvez_profile,
        srcImageStartUp: mexOpp,
        imageStartUpSize: {
            height: 70,
            width: 120
        },
    },
    {
        name: 'Laura Gonzalez',
        description: 'CBO Strategic Growth',
        srcImageProfile: laura_gonzalez_profile,
        srcImageStartUp: stays,
        imageStartUpSize: {
            height: 60,
            width: 60
        },
    },
    {
        name: 'Freddy Vega',
        description: 'Founder and CEO',
        srcImageProfile: freddy_vega_profile,
        srcImageStartUp: platzi,
        imageStartUpSize: {
            height: 60,
            width: 110
        },
    },
    {
        name: 'Daniela Alvarez',
        description: 'Angel Investments',
        srcImageProfile: daniela_alvarez_profile,
        srcImageStartUp: nazca,
        imageStartUpSize: {
            height: 60,
            width: 140
        },
    },
    {
        name: 'Christian Van Der Henst',
        description: 'Co-founder and President',
        srcImageProfile: christian_van_der_henst_profile,
        srcImageStartUp: platzi,
        imageStartUpSize: {
            height: 60,
            width: 110
        },
    },
    {
        name: 'Javier Villamizar',
        description: 'Operating Partner',
        srcImageProfile: javier_villamizar_profile,
        srcImageStartUp: softbank,
        imageStartUpSize: {
            height: 50,
            width: 120
        },
    },
    {
        name: 'Ana Cristina Gadala',
        description: 'Early stage fintech investor',
        srcImageProfile: ana_cristina_gadala_profile,
        srcImageStartUp: qed_investors,
        imageStartUpSize: {
            height: 50,
            width: 50
        },
    },
    {
        name: 'Cristina Kenna',
        description: 'Partner',
        srcImageProfile: cristina_kenna_profile,
        srcImageStartUp: ignia,
        imageStartUpSize: {
            height: 60,
            width: 110
        },
    },

    {
        name: 'Karla Berman',
        description: 'Shark Tank México',
        srcImageProfile: karla_berman_profile,
        srcImageStartUp: shark_tank,
        imageStartUpSize: {
            height: 60,
            width: 60
        },
    },
    {
        name: 'Eyal Shats',
        description: 'Co-founder and CSO',
        srcImageProfile: eyal_shats_profile,
        srcImageStartUp: simpli_route,
        imageStartUpSize: {
            height: 60,
            width: 60
        },
    },
    {
        name: 'Adrian Garcia-Aranyos',
        description: 'Global President',
        srcImageProfile: adrian_garcia_aranyos_profile,
        srcImageStartUp: endeavorglobal,
        imageStartUpSize: {
            height: 60,
            width: 60
        },
    },
    {
        name: 'Sarah AlSaleh',
        description: 'General Partner',
        srcImageProfile: sarah_alsaleh_profile,
        srcImageStartUp: outliersvc,
        imageStartUpSize: {
            height: 60,
            width: 60
        },
    },
]

export default Mentors
