// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = "shell-9.1.6--v1--sw/";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v1--sw/";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--2024-05-17T11:12:46-05:00--sw/";

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = "sw-cache";
const NO_CACHE_SEARCH_PARAM = "no-cache";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/assets/icomoon/style.css";
const KATEX_FONT = "/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/assets/css/hydejack-9.1.6.css",
  "/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/"/CNAME",
  /**/"/assets/files/3d/lec1.blend",
  /**/"/assets/files/3d/screw.stl",
  /**/"/assets/files/Mathematica/11804_Airplane_v2_l2.obj",
  /**/"/assets/files/Mathematica/Debris_Towing.pdf",
  /**/"/assets/files/Mathematica/Lecture-1.nb",
  /**/"/assets/files/Mathematica/Lecture_Animation.nb",
  /**/"/assets/files/Mathematica/NumericalMethods.pdf",
  /**/"/assets/files/Mathematica/atm.txt",
  /**/"/assets/files/Mathematica/reentry.cdf",
  /**/"/assets/files/Mathematica/reentry.nb",
  /**/"/assets/files/Mathematica/reentry.pdf",
  /**/"/assets/files/Mazurmovich.asc",
  /**/"/assets/files/NL_Data_1.csv",
  /**/"/assets/files/NL_Data_10.csv",
  /**/"/assets/files/NL_Data_11.csv",
  /**/"/assets/files/NL_Data_12.csv",
  /**/"/assets/files/NL_Data_2.csv",
  /**/"/assets/files/NL_Data_3.csv",
  /**/"/assets/files/NL_Data_4.csv",
  /**/"/assets/files/NL_Data_5.csv",
  /**/"/assets/files/NL_Data_6.csv",
  /**/"/assets/files/NL_Data_7.csv",
  /**/"/assets/files/NL_Data_8.csv",
  /**/"/assets/files/NL_Data_9.csv",
  /**/"/assets/files/Pokemon.csv",
  /**/"/assets/files/Weather%20Test%20Data.csv",
  /**/"/assets/files/Weather%20Training%20Data.csv",
  /**/"/assets/files/Yudintsev_2022.asc",
  /**/"/assets/files/advertising.csv",
  /**/"/assets/files/data/Average_Temperature_of_Cities.csv",
  /**/"/assets/files/data/Mazurmovich.asc",
  /**/"/assets/files/data/NL_Data_1.csv",
  /**/"/assets/files/data/NL_Data_10.csv",
  /**/"/assets/files/data/NL_Data_11.csv",
  /**/"/assets/files/data/NL_Data_12.csv",
  /**/"/assets/files/data/NL_Data_2.csv",
  /**/"/assets/files/data/NL_Data_3.csv",
  /**/"/assets/files/data/NL_Data_4.csv",
  /**/"/assets/files/data/NL_Data_5.csv",
  /**/"/assets/files/data/NL_Data_6.csv",
  /**/"/assets/files/data/NL_Data_7.csv",
  /**/"/assets/files/data/NL_Data_8.csv",
  /**/"/assets/files/data/NL_Data_9.csv",
  /**/"/assets/files/data/Pokemon.csv",
  /**/"/assets/files/data/RBI.xlsx",
  /**/"/assets/files/data/Vadim_Yudintsev_0x47C14836_public.asc",
  /**/"/assets/files/data/Weather%20Test%20Data.csv",
  /**/"/assets/files/data/Weather%20Training%20Data.csv",
  /**/"/assets/files/data/Yudintsev_2022.asc",
  /**/"/assets/files/data/advertising.csv",
  /**/"/assets/files/data/bank.csv",
  /**/"/assets/files/data/data_1.csv",
  /**/"/assets/files/data/data_10.csv",
  /**/"/assets/files/data/data_11.csv",
  /**/"/assets/files/data/data_12.csv",
  /**/"/assets/files/data/data_13.csv",
  /**/"/assets/files/data/data_14.csv",
  /**/"/assets/files/data/data_15.csv",
  /**/"/assets/files/data/data_2.csv",
  /**/"/assets/files/data/data_3.csv",
  /**/"/assets/files/data/data_4.csv",
  /**/"/assets/files/data/data_5.csv",
  /**/"/assets/files/data/data_6.csv",
  /**/"/assets/files/data/data_7.csv",
  /**/"/assets/files/data/data_8.csv",
  /**/"/assets/files/data/data_9.csv",
  /**/"/assets/files/data/regr_data_1.csv",
  /**/"/assets/files/data/regr_data_10.csv",
  /**/"/assets/files/data/regr_data_11.csv",
  /**/"/assets/files/data/regr_data_12.csv",
  /**/"/assets/files/data/regr_data_2.csv",
  /**/"/assets/files/data/regr_data_3.csv",
  /**/"/assets/files/data/regr_data_4.csv",
  /**/"/assets/files/data/regr_data_5.csv",
  /**/"/assets/files/data/regr_data_6.csv",
  /**/"/assets/files/data/regr_data_7.csv",
  /**/"/assets/files/data/regr_data_8.csv",
  /**/"/assets/files/data/regr_data_9.csv",
  /**/"/assets/files/data_1.csv",
  /**/"/assets/files/data_10.csv",
  /**/"/assets/files/data_11.csv",
  /**/"/assets/files/data_12.csv",
  /**/"/assets/files/data_13.csv",
  /**/"/assets/files/data_14.csv",
  /**/"/assets/files/data_15.csv",
  /**/"/assets/files/data_2.csv",
  /**/"/assets/files/data_3.csv",
  /**/"/assets/files/data_4.csv",
  /**/"/assets/files/data_5.csv",
  /**/"/assets/files/data_6.csv",
  /**/"/assets/files/data_7.csv",
  /**/"/assets/files/data_8.csv",
  /**/"/assets/files/data_9.csv",
  /**/"/assets/files/debris/Darmshtadt_report.pdf",
  /**/"/assets/files/debris/GLEX_Yudintsev.pdf",
  /**/"/assets/files/debris/Trushlyakov_629.pdf",
  /**/"/assets/files/debris/Trushlyakov_629.pptx",
  /**/"/assets/files/debris/Yo-Yo_Presentation.pdf",
  /**/"/assets/files/pdf/Alfriend_Spacecraft_formation_flying_2010.pdf",
  /**/"/assets/files/pdf/Case_Lagrange.pdf",
  /**/"/assets/files/pdf/Certificate_AA_Recognised.pdf",
  /**/"/assets/files/pdf/Certificate_AESCTE_Recognised.pdf",
  /**/"/assets/files/pdf/Certificate_JASR_Recognised.pdf",
  /**/"/assets/files/pdf/Presentation_Euler_angles.pdf",
  /**/"/assets/files/pdf/bd/BD_1.pdf",
  /**/"/assets/files/pdf/bd/BD_2.pdf",
  /**/"/assets/files/pdf/bd/BD_3.pdf",
  /**/"/assets/files/pdf/bd/BD_4.pdf",
  /**/"/assets/files/pdf/bd/BD_5.pdf",
  /**/"/assets/files/pdf/bd/BD_6.pdf",
  /**/"/assets/files/pdf/bd/Lab_Report_Template_ERD.docx",
  /**/"/assets/files/pdf/bd/Lab_Report_Template_ERD.pdf",
  /**/"/assets/files/pdf/bd/exam_paper.pdf",
  /**/"/assets/files/pdf/bd/exam_questions.pdf",
  /**/"/assets/files/pdf/bd/pizza.pdf",
  /**/"/assets/files/pdf/graphics/Computer_graphics_1.pdf",
  /**/"/assets/files/pdf/graphics/Computer_graphics_ffmpeg_imagemagic.pdf",
  /**/"/assets/files/pdf/graphics/Computer_graphics_gnuplot.pdf",
  /**/"/assets/files/pdf/graphics/Rotation.pdf",
  /**/"/assets/files/pdf/it-service/Bakaev.pdf",
  /**/"/assets/files/pdf/it-service/Baraksanov.pdf",
  /**/"/assets/files/pdf/it-service/CMS.pdf",
  /**/"/assets/files/pdf/it-service/Change.pdf",
  /**/"/assets/files/pdf/it-service/Configuration.pdf",
  /**/"/assets/files/pdf/it-service/IT-BigData.pdf",
  /**/"/assets/files/pdf/it-service/IT-Sec.pdf",
  /**/"/assets/files/pdf/it-service/IT-infrastructure.pdf",
  /**/"/assets/files/pdf/it-service/ITS-ITIL.pdf",
  /**/"/assets/files/pdf/it-service/Introduction.pdf",
  /**/"/assets/files/pdf/it-service/Lab1-example.pdf",
  /**/"/assets/files/pdf/mbs/Case_Lagrange.pdf",
  /**/"/assets/files/pdf/mbs/Presentation_Euler_angles.pdf",
  /**/"/assets/files/pdf/mbs/structure.pdf",
  /**/"/assets/files/pdf/mbs/%D0%94%D0%B2%D0%BE%D0%B9%D0%BD%D0%BE%D0%B9_%D0%BC%D0%B0%D1%8F%D1%82%D0%BD%D0%B8%D0%BA.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%9A%D0%B5%D0%B9%D0%BD%D0%B0.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BE%D1%82%D0%B4%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D1%82%D0%B5%D0%BB.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9A%D0%B2%D0%B0%D1%82%D0%B5%D1%80%D0%BD%D0%B8%D0%BE%D0%BD%D1%8B.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9E%D1%80%D1%82%D0%BE%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B_%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8_%D0%A2%D0%A2.pdf",
  /**/"/assets/files/pdf/mbs/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%A3%D0%B3%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F_%D1%81%D0%BA%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8C.pdf",
  /**/"/assets/files/pdf/mbs/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9_%D0%AD%D0%B9%D0%BB%D0%B5%D1%80%D0%B0.pdf",
  /**/"/assets/files/pdf/mbs/%D0%A1%D1%84%D0%B5%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D1%8B.pdf",
  /**/"/assets/files/pdf/mbs/%D0%A6%D0%B8%D0%BB%D0%B8%D0%BD%D0%B4%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D1%8B.pdf",
  /**/"/assets/files/pdf/mechanics-in-space/Falcon9-landing-simple-model.pdf",
  /**/"/assets/files/pdf/mechanics-in-space/Relative_orbital_motion.pdf",
  /**/"/assets/files/pdf/mechanics-in-space/%D0%9E%D1%80%D0%B1%D0%B8%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%82%D1%80%D0%BE%D1%81%D0%BE%D0%B2%D0%B0%D1%8F_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0.pdf",
  /**/"/assets/files/pdf/mechanics-in-space/%D0%A1%D0%BF%D0%BE%D1%81%D0%BE%D0%B1%D1%8B_%D0%B7%D0%B0%D1%85%D0%B2%D0%B0%D1%82%D0%B0_%D0%B8_%D1%83%D0%B2%D0%BE%D0%B4%D0%B0.pdf",
  /**/"/assets/files/pdf/papers/AA_2022.pdf",
  /**/"/assets/files/pdf/papers/CubeSat.pdf",
  /**/"/assets/files/pdf/papers/IT_Transport_2024.pdf",
  /**/"/assets/files/pdf/papers/JGCD_2019.pdf",
  /**/"/assets/files/pdf/papers/Polet_2012.pdf",
  /**/"/assets/files/pdf/papers/SSAU_2003.pdf",
  /**/"/assets/files/pdf/papers/SSAU_2010.pdf",
  /**/"/assets/files/pdf/papers/SSAU_2012.pdf",
  /**/"/assets/files/pdf/papers/SSAU_2015.pdf",
  /**/"/assets/files/pdf/python/Functional_programming.pdf",
  /**/"/assets/files/pdf/python/IEEE754.pdf",
  /**/"/assets/files/pdf/python/Introduction.pdf",
  /**/"/assets/files/pdf/python/Pyhton_basics_2_1.pdf",
  /**/"/assets/files/pdf/python/Pyhton_basics_2_2.pdf",
  /**/"/assets/files/pdf/python/Pyhton_basics_2_3.pdf",
  /**/"/assets/files/pdf/python/Pyhton_exceptions.pdf",
  /**/"/assets/files/pdf/python/Pyhton_functions.pdf",
  /**/"/assets/files/pdf/python/Python_OOP_part_I.pdf",
  /**/"/assets/files/pdf/python/Python_OOP_part_II.pdf",
  /**/"/assets/files/pdf/python/Python_input-output.pdf",
  /**/"/assets/files/pdf/python/Python_matplotlib.pdf",
  /**/"/assets/files/pdf/python/Python_modules.pdf",
  /**/"/assets/files/pdf/python/Python_numpy_I.pdf",
  /**/"/assets/files/pdf/python/Python_scipy_I.pdf",
  /**/"/assets/files/pdf/%D0%94%D0%B2%D0%BE%D0%B9%D0%BD%D0%BE%D0%B9_%D0%BC%D0%B0%D1%8F%D1%82%D0%BD%D0%B8%D0%BA.pdf",
  /**/"/assets/files/pdf/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%9A%D0%B5%D0%B9%D0%BD%D0%B0.pdf",
  /**/"/assets/files/pdf/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BE%D1%82%D0%B4%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D1%82%D0%B5%D0%BB.pdf",
  /**/"/assets/files/pdf/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9A%D0%B2%D0%B0%D1%82%D0%B5%D1%80%D0%BD%D0%B8%D0%BE%D0%BD%D1%8B.pdf",
  /**/"/assets/files/pdf/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9E%D1%80%D1%82%D0%BE%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B.pdf",
  /**/"/assets/files/pdf/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B_%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8_%D0%A2%D0%A2.pdf",
  /**/"/assets/files/pdf/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%A3%D0%B3%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F_%D1%81%D0%BA%D0%BE%D1%80%D0%BE%D1%81%D1%82%D1%8C.pdf",
  /**/"/assets/files/pdf/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9_%D0%AD%D0%B9%D0%BB%D0%B5%D1%80%D0%B0.pdf",
  /**/"/assets/files/pdf/%D0%A1%D1%84%D0%B5%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D1%8B.pdf",
  /**/"/assets/files/pdf/%D0%A6%D0%B8%D0%BB%D0%B8%D0%BD%D0%B4%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%80%D0%BD%D0%B8%D1%80%D1%8B.pdf",
  /**/"/assets/files/python/Falcon_D.png",
  /**/"/assets/files/python/Falcon_h_dh.png",
  /**/"/assets/files/python/Falcon_s_ds.png",
  /**/"/assets/files/python/falcon_leg.ipynb",
  /**/"/assets/files/python/moon_lander.ipynb",
  /**/"/assets/files/python/ode-ballistic-example.ipynb",
  /**/"/assets/files/python/pendulum-phi.svg",
  /**/"/assets/files/python/pendulum_friction.ipynb",
  /**/"/assets/files/regr_data_1.csv",
  /**/"/assets/files/regr_data_10.csv",
  /**/"/assets/files/regr_data_11.csv",
  /**/"/assets/files/regr_data_12.csv",
  /**/"/assets/files/regr_data_2.csv",
  /**/"/assets/files/regr_data_3.csv",
  /**/"/assets/files/regr_data_4.csv",
  /**/"/assets/files/regr_data_5.csv",
  /**/"/assets/files/regr_data_6.csv",
  /**/"/assets/files/regr_data_7.csv",
  /**/"/assets/files/regr_data_8.csv",
  /**/"/assets/files/regr_data_9.csv",
  /**/"/assets/icons/favicon.ico",
  /**/"/assets/icons/favicon.svg",
  /**/"/assets/img/2019-12-10-pde-thermal-f1.png",
  /**/"/assets/img/2019-12-10-pde-thermal-f2.png",
  /**/"/assets/img/2019-12-10-pde-thermal-f3.png",
  /**/"/assets/img/2019-12-10-pde-thermal-f4.png",
  /**/"/assets/img/2019-12-10-pde-thermal-f5.png",
  /**/"/assets/img/4plots.png",
  /**/"/assets/img/GO_1.jpg",
  /**/"/assets/img/GO_2.jpg",
  /**/"/assets/img/GO_3.jpg",
  /**/"/assets/img/Kniga1.png",
  /**/"/assets/img/Matlab_Logo.png",
  /**/"/assets/img/RTSS.gif",
  /**/"/assets/img/YoYo_in_plane.png",
  /**/"/assets/img/adm_on_bm.png",
  /**/"/assets/img/adm_on_bm_scheme.png",
  /**/"/assets/img/apple.png",
  /**/"/assets/img/back.jpg",
  /**/"/assets/img/back1.jpg",
  /**/"/assets/img/back2.jpg",
  /**/"/assets/img/back3.jpg",
  /**/"/assets/img/bar1.png",
  /**/"/assets/img/bigdata/boxplot_born.png",
  /**/"/assets/img/bigdata/pair-grid.png",
  /**/"/assets/img/bigdata/scatter-TV-sales-regr.png",
  /**/"/assets/img/bigdata/scatter-TV-sales.png",
  /**/"/assets/img/blog/COLOURlovers.com-Hydejack.png",
  /**/"/assets/img/blog/RTSS.gif",
  /**/"/assets/img/blog/battin.svg",
  /**/"/assets/img/blog/blog-layout.jpg",
  /**/"/assets/img/blog/caleb-george-old.jpg",
  /**/"/assets/img/blog/caleb-george.jpg",
  /**/"/assets/img/blog/course_work_inertia.png",
  /**/"/assets/img/blog/course_work_mech.png",
  /**/"/assets/img/blog/cover-page.jpg",
  /**/"/assets/img/blog/cubesat.png",
  /**/"/assets/img/blog/dark-mode.jpg",
  /**/"/assets/img/blog/example-content-ii.jpg",
  /**/"/assets/img/blog/example-content-iii.jpg",
  /**/"/assets/img/blog/f9-gear-open-1.png",
  /**/"/assets/img/blog/f9-gear-open-2.png",
  /**/"/assets/img/blog/f9-gear-open-3.png",
  /**/"/assets/img/blog/f9-gear-open-4.png",
  /**/"/assets/img/blog/gear-open-image.png",
  /**/"/assets/img/blog/hydejack-8.png",
  /**/"/assets/img/blog/hydejack-8@0,25x.png",
  /**/"/assets/img/blog/hydejack-8@0,5x.png",
  /**/"/assets/img/blog/jan-simintech-131-232.png",
  /**/"/assets/img/blog/jan-simintech-CS.png",
  /**/"/assets/img/blog/jan-simintech-body-prop.png",
  /**/"/assets/img/blog/jan-simintech-dynamic-2.png",
  /**/"/assets/img/blog/jan-simintech-kinematic-2.png",
  /**/"/assets/img/blog/jan-simintech-model.png",
  /**/"/assets/img/blog/jan-simintech-object.png",
  /**/"/assets/img/blog/jan-simintech-params-sim.png",
  /**/"/assets/img/blog/jan-simintech-pendulum.gif",
  /**/"/assets/img/blog/jan-simintech-screw.png",
  /**/"/assets/img/blog/jan-simintech-script-button.png",
  /**/"/assets/img/blog/jan-simintech-signals-write.png",
  /**/"/assets/img/blog/jan-simintech-signals.png",
  /**/"/assets/img/blog/jan-simintech-submodel-type.png",
  /**/"/assets/img/blog/jan-simintech-sync.png",
  /**/"/assets/img/blog/jan-simintech-wxwywz.png",
  /**/"/assets/img/blog/landing-gear.jpg",
  /**/"/assets/img/blog/lazy-images.jpg",
  /**/"/assets/img/blog/pendulum-friction.svg",
  /**/"/assets/img/blog/push-stages.png",
  /**/"/assets/img/blog/resume.png",
  /**/"/assets/img/blog/rst-active-phase.png",
  /**/"/assets/img/blog/rst-active.png",
  /**/"/assets/img/blog/rst-meandr.png",
  /**/"/assets/img/blog/rst-model.svg",
  /**/"/assets/img/blog/rst-passive-phase.png",
  /**/"/assets/img/blog/rst-pull.png",
  /**/"/assets/img/blog/rst-rele-16.png",
  /**/"/assets/img/blog/rst-res-delta.png",
  /**/"/assets/img/blog/rst-res-phase-thrust.png",
  /**/"/assets/img/blog/rst-rigid-link.png",
  /**/"/assets/img/blog/rst-rst.png",
  /**/"/assets/img/blog/rst-simintech-0.png",
  /**/"/assets/img/blog/rst-simintech-1.png",
  /**/"/assets/img/blog/rst-simintech-2.png",
  /**/"/assets/img/blog/rst-simintech-3.png",
  /**/"/assets/img/blog/rst-simintech-K.png",
  /**/"/assets/img/blog/rst-simintech-Phi.png",
  /**/"/assets/img/blog/rst-simintech-PhiP.png",
  /**/"/assets/img/blog/rst-simintech-graph1.png",
  /**/"/assets/img/blog/rst-simintech-module-P.png",
  /**/"/assets/img/blog/rst-simple-PL-1.png",
  /**/"/assets/img/blog/rst-simple-PL-2.png",
  /**/"/assets/img/blog/rst-simple-PL-3.png",
  /**/"/assets/img/blog/screw-poster.png",
  /**/"/assets/img/blog/screw.mp4",
  /**/"/assets/img/blog/screw.webm",
  /**/"/assets/img/blog/simintech-ground-test-model/eu-model.png",
  /**/"/assets/img/blog/simintech-ground-test-model/eu.jpg",
  /**/"/assets/img/blog/simintech-ground-test-model/eu.svg",
  /**/"/assets/img/blog/simintech-ground-test-model/mass.png",
  /**/"/assets/img/blog/simintech-ground-test-model/model.png",
  /**/"/assets/img/blog/simintech-ground-test-model/nonlinear-spring.png",
  /**/"/assets/img/blog/simintech-ground-test-model/op-otsek.png",
  /**/"/assets/img/blog/simintech-ground-test-model/pusher-force.png",
  /**/"/assets/img/blog/simintech-ground-test-model/slide.png",
  /**/"/assets/img/blog/simintech-ground-test-model/solar-array.png",
  /**/"/assets/img/blog/simintech-ground-test-model/tether.png",
  /**/"/assets/img/blog/simintech-ground-test-model/velocity1.png",
  /**/"/assets/img/blog/simintech-ground-test-model/velocity2.png",
  /**/"/assets/img/blog/simintech-jump/VxVy.png",
  /**/"/assets/img/blog/simintech-jump/link-editor.png",
  /**/"/assets/img/blog/simintech-jump/manager.png",
  /**/"/assets/img/blog/simintech-jump/model-params.png",
  /**/"/assets/img/blog/simintech-jump/object-3D.png",
  /**/"/assets/img/blog/simintech-jump/res3D.gif",
  /**/"/assets/img/blog/simintech-jump/signals.png",
  /**/"/assets/img/blog/simintech-jump/simintech-jump-1.png",
  /**/"/assets/img/blog/simintech-jump/simintech-jump-2.png",
  /**/"/assets/img/blog/simintech-jump/simintech-jump-3.png",
  /**/"/assets/img/blog/simintech-jump/simintech-jump-4.png",
  /**/"/assets/img/blog/simintech-jump/simintech-jump-5.png",
  /**/"/assets/img/blog/simintech-jump/simintech-model.png",
  /**/"/assets/img/blog/simintech-jump/theta-gamma.png",
  /**/"/assets/img/blog/simintech-jump/title.png",
  /**/"/assets/img/blog/simintech-jump/viewer-3D.png",
  /**/"/assets/img/blog/simintech-jump/xy.png",
  /**/"/assets/img/blog/two-dof-mech-python-1.png",
  /**/"/assets/img/blog/two-dof-mech-python-2.png",
  /**/"/assets/img/blog/two-dof-mech-python-TPE.png",
  /**/"/assets/img/blog/two-dof-mech-python-c-effect.png",
  /**/"/assets/img/blog/two-dof-mech-python-phi.png",
  /**/"/assets/img/blog/two-dof-mech-python-sigmoid.png",
  /**/"/assets/img/blog/two-dof-mech-python-x-v-1.png",
  /**/"/assets/img/blog/two-dof-mech-python-x.png",
  /**/"/assets/img/blog/two-dof-mech-python.png",
  /**/"/assets/img/blog/w3m.png",
  /**/"/assets/img/blog/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%9A%D0%A0_%D0%9C%D0%B5%D1%85%D0%B0%D0%BD%D0%B8%D0%BA%D0%B0_Python.svg",
  /**/"/assets/img/blog/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BE%D0%B1%D0%B5%D0%B7%D0%B2%D0%B5%D1%88%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.svg",
  /**/"/assets/img/blog/%D0%B3%D0%B0%D0%B9%D0%BA%D0%B0.gif",
  /**/"/assets/img/blueprint-kerbal-program-rocket-wallpaper.jpg",
  /**/"/assets/img/code-background.jpg",
  /**/"/assets/img/db/dbeaver1.jpg",
  /**/"/assets/img/db/dbeaver2.jpg",
  /**/"/assets/img/db/dbeaver3.jpg",
  /**/"/assets/img/db/dbeaver4.jpg",
  /**/"/assets/img/db/dbeaver5.jpg",
  /**/"/assets/img/db/student-vkr-1.png",
  /**/"/assets/img/db/student-vkr-2.png",
  /**/"/assets/img/db/student-vkr-3.png",
  /**/"/assets/img/db/student-vkr-4.png",
  /**/"/assets/img/db/student-vkr-5.png",
  /**/"/assets/img/db/student-vkr-6.png",
  /**/"/assets/img/db/student-vkr-7.png",
  /**/"/assets/img/db/student-vkr-er-1.png",
  /**/"/assets/img/db/student-vkr-er-2.png",
  /**/"/assets/img/db/students-1.png",
  /**/"/assets/img/db/students-vkr-techer-1.png",
  /**/"/assets/img/db/students-vkr-techer-2.png",
  /**/"/assets/img/db/students-vkr-techer.png",
  /**/"/assets/img/db/teachers.png",
  /**/"/assets/img/db/vkr-1.png",
  /**/"/assets/img/db/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82-%D0%B2%D0%BA%D1%80.xlsx",
  /**/"/assets/img/default.jpg",
  /**/"/assets/img/docs/google-fonts.png",
  /**/"/assets/img/eq-background.jpg",
  /**/"/assets/img/fairing/GO-NEO.png",
  /**/"/assets/img/fairing/GO-forces.png",
  /**/"/assets/img/fairing/GO-scheme-2.png",
  /**/"/assets/img/fairing/GO-scheme.png",
  /**/"/assets/img/fairing/GO-size.png",
  /**/"/assets/img/fairing/Leaf-model-1.png",
  /**/"/assets/img/fairing/Leaf-model-2.png",
  /**/"/assets/img/fairing/Pneumatic_system.png",
  /**/"/assets/img/fairing/Pneumo-1.png",
  /**/"/assets/img/fairing/Pneumo-2.png",
  /**/"/assets/img/fairing/fairing-frontpage.png",
  /**/"/assets/img/fairing/pusher-prop.png",
  /**/"/assets/img/fairing/simintech-export.png",
  /**/"/assets/img/fairing/simintech-fairing-angle.png",
  /**/"/assets/img/fairing/simintech-fairing-force.png",
  /**/"/assets/img/fairing/simintech-fairing-pressure.png",
  /**/"/assets/img/fairing/simintech-fairing-s.png",
  /**/"/assets/img/fairing/simintech-fairing-w.png",
  /**/"/assets/img/fairing/simintech-links.png",
  /**/"/assets/img/fairing/simintech-packet-structure.png",
  /**/"/assets/img/fairing/simintech-packet.png",
  /**/"/assets/img/fairing/simintech-proj-settings.png",
  /**/"/assets/img/fairing/simintech-signals.png",
  /**/"/assets/img/fairing/submodel_pneumatic.png",
  /**/"/assets/img/fminbnd.png",
  /**/"/assets/img/fminsearch.png",
  /**/"/assets/img/fplot.png",
  /**/"/assets/img/gallery1/7169817751.jpg",
  /**/"/assets/img/gallery1/7169819247.jpg",
  /**/"/assets/img/gallery1/7169819909.jpg",
  /**/"/assets/img/gallery1/7169823103.jpg",
  /**/"/assets/img/gallery1/7169846061.jpg",
  /**/"/assets/img/gallery1/7355027066.jpg",
  /**/"/assets/img/gallery1/7355027868.jpg",
  /**/"/assets/img/gallery1/7355029676.jpg",
  /**/"/assets/img/gallery1/7355034224.jpg",
  /**/"/assets/img/gallery1/7355034488.jpg",
  /**/"/assets/img/gallery1/7355035098.jpg",
  /**/"/assets/img/game_life_def.png",
  /**/"/assets/img/game_life_glider_1.png",
  /**/"/assets/img/game_life_glider_2.png",
  /**/"/assets/img/hal.png",
  /**/"/assets/img/holdon.png",
  /**/"/assets/img/hydejack-8.jpg",
  /**/"/assets/img/hydejack-8@0,25x.jpg",
  /**/"/assets/img/hydejack-8@0,5x.jpg",
  /**/"/assets/img/intercept.gif",
  /**/"/assets/img/interp1.png",
  /**/"/assets/img/it/Draw-io_Example_plan.png",
  /**/"/assets/img/it/Draw-io_Export.png",
  /**/"/assets/img/it/Draw-io_Export_settings.png",
  /**/"/assets/img/it/Draw-io_More_shapes.png",
  /**/"/assets/img/it/Draw-io_More_shapes2.png",
  /**/"/assets/img/it/Draw-io_Window.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-18-48.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-19-13.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-19-53.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-20-14.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-20-30.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-20-45.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-20-58.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-21-20.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-26-47.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-27-48.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-28-05.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-28-26.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-29-20.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-33-29.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-33-47.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-33-56.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-34-11.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-34-25.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-34-39.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-34-58.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-35-23.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-35-48.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-36-06.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-36-19.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-36-31.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-36-46.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-37-04.png",
  /**/"/assets/img/it/gpg4win/2023-04-10_07-37-36.png",
  /**/"/assets/img/it/gpg4win/flow.drawio",
  /**/"/assets/img/it/gpg4win/flow.png",
  /**/"/assets/img/it/itop-all-ce.png",
  /**/"/assets/img/it/itop-all-software-section.png",
  /**/"/assets/img/it/itop-computers.png",
  /**/"/assets/img/it/itop-edit-org.png",
  /**/"/assets/img/it/itop-filter-org.png",
  /**/"/assets/img/it/itop-models.png",
  /**/"/assets/img/it/itop-new-computer.png",
  /**/"/assets/img/it/itop-new-location.png",
  /**/"/assets/img/it/itop-new-network-device.png",
  /**/"/assets/img/it/itop-new-pc.png",
  /**/"/assets/img/it/itop-new-software.png",
  /**/"/assets/img/it/itop-org1.png",
  /**/"/assets/img/it/itop-os-family.png",
  /**/"/assets/img/it/itop-os-version.png",
  /**/"/assets/img/it/itop-pc-contact.png",
  /**/"/assets/img/it/itop-pc.png",
  /**/"/assets/img/it/itop-places.png",
  /**/"/assets/img/it/itop-typology.png",
  /**/"/assets/img/it/net-example.png",
  /**/"/assets/img/it/org_chart.png",
  /**/"/assets/img/it/service-catalog-1.png",
  /**/"/assets/img/it/service-catalog-2.png",
  /**/"/assets/img/it/service-catalog-3.png",
  /**/"/assets/img/it/service-catalog-4.png",
  /**/"/assets/img/kr_model.png",
  /**/"/assets/img/matlab/block_model.png",
  /**/"/assets/img/matlab/block_on-off.png",
  /**/"/assets/img/matlab/block_s.png",
  /**/"/assets/img/matlab/block_sc.png",
  /**/"/assets/img/matlab/elleiptic-pendulum.svg",
  /**/"/assets/img/matlab/elliptic-res-x-phi.png",
  /**/"/assets/img/matlab/elliptic_pendulum.png",
  /**/"/assets/img/matlab/lorenz-system.png",
  /**/"/assets/img/matlab/pool.png",
  /**/"/assets/img/matlab/pool.svg",
  /**/"/assets/img/matlab/re-entry-xyz.svg",
  /**/"/assets/img/matlab/relay_parameters.png",
  /**/"/assets/img/matlab/sat_control_viper.svg",
  /**/"/assets/img/matlab/simple_pendulum.svg",
  /**/"/assets/img/matlab/stabilization_phase_space.png",
  /**/"/assets/img/matlab/stabilization_phase_space_2.png",
  /**/"/assets/img/matlab/subsystem_1.png",
  /**/"/assets/img/matlab/subsystem_2.png",
  /**/"/assets/img/matlab/subsystem_3.png",
  /**/"/assets/img/matlab/tether_model.svg",
  /**/"/assets/img/matlab/tether_model_lab.svg",
  /**/"/assets/img/matlab/u_function.svg",
  /**/"/assets/img/matlab_spring_masses.png",
  /**/"/assets/img/mbs/2dof-mot-task.svg",
  /**/"/assets/img/mbs/Lagrange_case.png",
  /**/"/assets/img/mbs/Orbital_stage.png",
  /**/"/assets/img/mbs/cw/1.png",
  /**/"/assets/img/mbs/cw/10.png",
  /**/"/assets/img/mbs/cw/11.png",
  /**/"/assets/img/mbs/cw/12.png",
  /**/"/assets/img/mbs/cw/13.png",
  /**/"/assets/img/mbs/cw/14.png",
  /**/"/assets/img/mbs/cw/15.png",
  /**/"/assets/img/mbs/cw/2.png",
  /**/"/assets/img/mbs/cw/3.png",
  /**/"/assets/img/mbs/cw/4.png",
  /**/"/assets/img/mbs/cw/5.png",
  /**/"/assets/img/mbs/cw/6.png",
  /**/"/assets/img/mbs/cw/7.png",
  /**/"/assets/img/mbs/cw/8.png",
  /**/"/assets/img/mbs/cw/9.png",
  /**/"/assets/img/mbs/godograph.png",
  /**/"/assets/img/mbs/lab_mbs_euler.png",
  /**/"/assets/img/mbs/mbs_J_lab_example.svg",
  /**/"/assets/img/mbs/mbs_omega_5.jpg",
  /**/"/assets/img/mbs/nutation.png",
  /**/"/assets/img/mbs/orbital-stage-w-res-python.png",
  /**/"/assets/img/mbs/pend2.svg",
  /**/"/assets/img/mbs/pend2_exploded.svg",
  /**/"/assets/img/mbs/point_on_roof_1.svg",
  /**/"/assets/img/mbs/point_on_roof_2.png",
  /**/"/assets/img/mbs/point_on_roof_2.svg",
  /**/"/assets/img/mbs/soplo.png",
  /**/"/assets/img/mbs_J_lab.png",
  /**/"/assets/img/mbs_J_var1.png",
  /**/"/assets/img/mbs_J_var2.png",
  /**/"/assets/img/mbs_J_var3.png",
  /**/"/assets/img/mechanics-in-space/3SC.png",
  /**/"/assets/img/mechanics-in-space/adams-mu-friction.svg",
  /**/"/assets/img/mechanics-in-space/debris-tether-tug-simple-model-points.png",
  /**/"/assets/img/mechanics-in-space/debris-tether-tug-simple-model-points.svg",
  /**/"/assets/img/mechanics-in-space/debris-tether-tug-simple-model.png",
  /**/"/assets/img/mechanics-in-space/debris-tether-tug-simple-model.svg",
  /**/"/assets/img/mechanics-in-space/falcon-leg-energy.png",
  /**/"/assets/img/mechanics-in-space/falcon-leg-scheme.png",
  /**/"/assets/img/mechanics-in-space/falcon-leg.png",
  /**/"/assets/img/mechanics-in-space/falcon-leg.svg",
  /**/"/assets/img/mechanics-in-space/honeycomb-damper-2.jpg",
  /**/"/assets/img/mechanics-in-space/honeycomb-damper.jpg",
  /**/"/assets/img/mechanics-in-space/leg-1-cs.png",
  /**/"/assets/img/mechanics-in-space/leg-falcon-scheme.png",
  /**/"/assets/img/mechanics-in-space/leg-open-cs-j2.png",
  /**/"/assets/img/mechanics-in-space/moon-lander-fig-stage2.png",
  /**/"/assets/img/mechanics-in-space/moon-lander-fig-stage34.png",
  /**/"/assets/img/mechanics-in-space/moon-lander-orbits.png",
  /**/"/assets/img/mechanics-in-space/moon-lander.png",
  /**/"/assets/img/mechanics-in-space/moon-lander.svg",
  /**/"/assets/img/mechanics-in-space/pusher-contact.svg",
  /**/"/assets/img/mechanics-in-space/relative-orbital-motion-example.png",
  /**/"/assets/img/mechanics-in-space/separation_fig_1.jpg",
  /**/"/assets/img/mechanics-in-space/separation_fig_1.png",
  /**/"/assets/img/mechanics-in-space/separation_fig_2.jpg",
  /**/"/assets/img/mechanics-in-space/separation_fig_2.png",
  /**/"/assets/img/mechanics-in-space/separation_fig_3.jpg",
  /**/"/assets/img/mechanics-in-space/separation_fig_3.png",
  /**/"/assets/img/mechanics-in-space/ssts.png",
  /**/"/assets/img/mechanics-in-space/ssts.svg",
  /**/"/assets/img/mechanics-in-space/start.svg",
  /**/"/assets/img/mechanics-in-space/step-function.svg",
  /**/"/assets/img/orbit.png",
  /**/"/assets/img/orbital.png",
  /**/"/assets/img/orbital_relative.png",
  /**/"/assets/img/papers.jpg",
  /**/"/assets/img/physics.png",
  /**/"/assets/img/pie1.png",
  /**/"/assets/img/pie2.png",
  /**/"/assets/img/plot1.png",
  /**/"/assets/img/polyfit1.png",
  /**/"/assets/img/polyfit2.png",
  /**/"/assets/img/project.png",
  /**/"/assets/img/projects/hy-drawer.svg",
  /**/"/assets/img/projects/hy-img.svg",
  /**/"/assets/img/projects/hy-push-state.svg",
  /**/"/assets/img/python/elliptic-pendulum-animation.gif",
  /**/"/assets/img/python/elliptic-pendulum-phi-x-plots.png",
  /**/"/assets/img/python/game-life-1.png",
  /**/"/assets/img/python/game-life-2.png",
  /**/"/assets/img/python/game-life-3.png",
  /**/"/assets/img/python/game-life-4.png",
  /**/"/assets/img/python/game-life-5.png",
  /**/"/assets/img/python/npoints_q.png",
  /**/"/assets/img/regr1.png",
  /**/"/assets/img/regr2.png",
  /**/"/assets/img/retime.png",
  /**/"/assets/img/rocket-ship.png",
  /**/"/assets/img/rocket.png",
  /**/"/assets/img/satellite.png",
  /**/"/assets/img/satmatrix.jpg",
  /**/"/assets/img/scheme_pull.png",
  /**/"/assets/img/scheme_push.png",
  /**/"/assets/img/script_current.png",
  /**/"/assets/img/script_new.png",
  /**/"/assets/img/script_new_function.png",
  /**/"/assets/img/script_section.png",
  /**/"/assets/img/script_setpath.png",
  /**/"/assets/img/sidebar-bg.jpg",
  /**/"/assets/img/spline.png",
  /**/"/assets/img/spring.png",
  /**/"/assets/img/stars-galaxy-milky-way-starry-sky.jpg",
  /**/"/assets/img/stat/CDF.svg",
  /**/"/assets/img/stat/CDF_Normal.pdf",
  /**/"/assets/img/stat/PDF.svg",
  /**/"/assets/img/stat/PDF.svg.png",
  /**/"/assets/img/stat/PDF_Normal.pdf",
  /**/"/assets/img/swipe.svg",
  /**/"/assets/img/ts1_plot.png",
  /**/"/assets/img/ts2_plot.png",
  /**/"/assets/img/ts3_plot.png",
  /**/"/assets/img/ts4_detrend.png",
  /**/"/assets/img/vadim-sadovski-2017-06-20-0-10-42.jpg",
  /**/"/assets/patents/Expertnoe.jpg",
  /**/"/assets/patents/Patent_2497732.PDF",
  /**/"/assets/patents/Patent_2567678.PDF",
  /**/"/assets/patents/Patent_262063.pdf",
  /**/"/assets/patents/Patent_2631360.pdf",
  /**/"/assets/patents/Patent_2643020.pdf",
  /**/"/assets/patents/Patent_2658401.pdf",
  /**/"/assets/patents/Patent_2676368.pdf",
  /**/"/assets/patents/Patent_2802109.pdf",
  /**/"/assets/patents/Patent_2813710.pdf",
  /**/"/assets/patents/readme.md",
  /**/"/classmech.code-workspace",
  /**/"/img_src/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%82%D0%B5%D0%BB_%D0%BF%D1%80%D1%83%D0%B6%D0%B8%D0%BD%D0%BA%D0%B8.afdesign",
  /**/"/jbuild.sh",
  /**/"/pages/data/sam.csv",
  /**/"/pages/databases/Lab_Report_Template.docx",
  /**/"/pages/databases/auth_gd_1.png",
  /**/"/pages/databases/auth_gd_2.png",
  /**/"/pages/databases/auth_gd_3.png",
  /**/"/pages/databases/bd_goods.png",
  /**/"/pages/databases/database_folder.png",
  /**/"/pages/databases/panda_table_res.png",
  /**/"/pages/informatics/Lab_Report_Template.docx",
  /**/"/pages/informatics/Turbo_Pascal_7.1.png",
  /**/"/pages/informatics/code.jpg",
  /**/"/pages/it/Lab_Report_Template.docx",
  /**/"/pages/matlab/econometrics/stationary.md",
  /**/"/pages/mbs/1.png",
  /**/"/pages/mbs/2.png",
  /**/"/pages/mbs/3.png",
  /**/"/pages/mbs/4.png",
  /**/"/pages/mbs/orbit.png",
  /**/"/pages/python/Lab_Report_Template.docx",
  /**/"/pages/python/course_works/Town1.gif",
  /**/"/pages/python/course_works/Town2.gif",
  /**/"/pages/python/course_works/lunolet.jpg",
  /**/"/pages/python/course_works/point_polygon.jpg",
  /**/"/pages/python/fracture_mechanics_homework.ipynb",
  /**/"/pages/python/lab_matplotlib.png",
  /**/"/pages/readme.md",
  /**/"/pages/thesis/2024/cold_separation.png",
  /**/"/pages/thesis/2024/cold_separation.svg",
  /**/"/pages/thesis/2024/safety-sat.png",
  /**/"/pages/thesis/2024/safety-sat.svg",
  /**/"/pages/thesis/2024/solar-array-deployment.JPG",
  /**/"/pages/thesis/2024/stack-sat.png",
  /**/"/pages/thesis/2024/stack-sat.svg",
  /**/"/pages/thesis/2025/tethered-sats.png",
  /**/"/pages/thesis/2025/tethered-sats.svg",
  /**/"/pages/wolfram/Lab_Report_Template.docx",
  /**/"/pages/wolfram/Lecture_1.pdf",
  /**/"/pages/wolfram/Lecture_2.pdf",
  /**/"/pages/wolfram/lab3.jpg",
  /**/"/pages/wolfram/lab6.md",
  /**/"/pages/wolfram/math-lab-1.jpg",
  /**/"/pages/wolfram/mech1.jpg",
  /**/"/pages/wolfram/mech2.jpg",
  /**/"/pages/wolfram/template.nb",
  /**/"/site/readme.md",
  /**/"/assets/bower.json",
  /**/"/assets/bower_components/MathJax/.bower.json",
  /**/"/assets/bower_components/MathJax/LICENSE",
  /**/"/assets/bower_components/MathJax/bower.json",
  /**/"/assets/bower_components/MathJax/composer.json",
  /**/"/assets/bower_components/MathJax/es5/a11y/assistive-mml.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/complexity.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/explorer.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js",
  /**/"/assets/bower_components/MathJax/es5/adaptors/liteDOM.js",
  /**/"/assets/bower_components/MathJax/es5/core.js",
  /**/"/assets/bower_components/MathJax/es5/input/asciimath.js",
  /**/"/assets/bower_components/MathJax/es5/input/mml/entities.js",
  /**/"/assets/bower_components/MathJax/es5/input/mml.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/action.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/color.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/html.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/require.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/textmacros.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex-base.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex-full.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex.js",
  /**/"/assets/bower_components/MathJax/es5/latest.js",
  /**/"/assets/bower_components/MathJax/es5/loader.js",
  /**/"/assets/bower_components/MathJax/es5/mml-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/mml-svg.js",
  /**/"/assets/bower_components/MathJax/es5/node-main.js",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml.js",
  /**/"/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js",
  /**/"/assets/bower_components/MathJax/es5/output/svg.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/de.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/en.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/es.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js",
  /**/"/assets/bower_components/MathJax/es5/sre/sre-node.js",
  /**/"/assets/bower_components/MathJax/es5/sre/sre_browser.js",
  /**/"/assets/bower_components/MathJax/es5/startup.js",
  /**/"/assets/bower_components/MathJax/es5/tex-chtml-full.js",
  /**/"/assets/bower_components/MathJax/es5/tex-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/tex-mml-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/tex-mml-svg.js",
  /**/"/assets/bower_components/MathJax/es5/tex-svg-full.js",
  /**/"/assets/bower_components/MathJax/es5/tex-svg.js",
  /**/"/assets/bower_components/MathJax/es5/ui/menu.js",
  /**/"/assets/bower_components/MathJax/es5/ui/safe.js",
  /**/"/assets/bower_components/MathJax/package.json",
  /**/"/assets/bower_components/html5shiv/.bower.json",
  /**/"/assets/bower_components/html5shiv/Gruntfile.js",
  /**/"/assets/bower_components/html5shiv/bower.json",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv.min.js",
  /**/"/assets/bower_components/html5shiv/package.json",
  /**/"/assets/bower_components/katex/.bower.json",
  /**/"/assets/bower_components/katex/LICENSE",
  /**/"/assets/bower_components/katex/bower.json",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.js",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.css",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.js",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.min.css",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.js",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.js",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.js",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.mjs",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/katex.css",
  /**/"/assets/bower_components/katex/dist/katex.js",
  /**/"/assets/bower_components/katex/dist/katex.min.css",
  /**/"/assets/bower_components/katex/dist/katex.min.js",
  /**/"/assets/bower_components/katex/dist/katex.mjs",
  /**/"/assets/bower_components/katex/flow-typed/npm/jest_v24.x.x.js",
  /**/"/assets/bower_components/katex/yarn.lock",
  /**/"/assets/icomoon/fonts/icomoon.eot",
  /**/"/assets/icomoon/fonts/icomoon.svg",
  /**/"/assets/icomoon/fonts/icomoon.ttf",
  /**/"/assets/icomoon/fonts/icomoon.woff",
  /**/"/assets/icomoon/selection.json",
  /**/"/assets/icomoon/style.css",
  /**/"/assets/icons/icon-128x128.png",
  /**/"/assets/icons/icon-144x144.png",
  /**/"/assets/icons/icon-152x152.png",
  /**/"/assets/icons/icon-192x192.png",
  /**/"/assets/icons/icon-384x384.png",
  /**/"/assets/icons/icon-512x512.png",
  /**/"/assets/icons/icon-72x72.png",
  /**/"/assets/icons/icon-96x96.png",
  /**/"/assets/img/logo.png",
  /**/"/assets/js/0-hydejack-9.1.6.worker.js",
  /**/"/assets/js/LEGACY-0-hydejack-9.1.6.worker.js",
  /**/"/assets/js/LEGACY-clap-button-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-drawer-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-fetch-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-navbar-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-push-state-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-resize-observer-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-search-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-shadydom-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-toc-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~clap-button-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~drawer-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~fetch-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~push-state-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~search-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~shadydom-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~webanimations-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-vendors~webcomponents-hydejack-9.1.6.js",
  /**/"/assets/js/LEGACY-webcomponents-hydejack-9.1.6.js",
  /**/"/assets/js/clap-button-hydejack-9.1.6.js",
  /**/"/assets/js/drawer-hydejack-9.1.6.js",
  /**/"/assets/js/fetch-hydejack-9.1.6.js",
  /**/"/assets/js/hydejack-9.1.6.js",
  /**/"/assets/js/navbar-hydejack-9.1.6.js",
  /**/"/assets/js/push-state-hydejack-9.1.6.js",
  /**/"/assets/js/resize-observer-hydejack-9.1.6.js",
  /**/"/assets/js/search-hydejack-9.1.6.js",
  /**/"/assets/js/shadydom-hydejack-9.1.6.js",
  /**/"/assets/js/toc-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~clap-button-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~drawer-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~drawer~push-state-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~drawer~push-state~search-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~fetch-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~intersection-observer-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~push-state-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~search-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~shadydom-hydejack-9.1.6.js",
  /**/"/assets/js/vendors~webanimations-hydejack-9.1.6.js",
  /**/"/assets/js/webcomponents-hydejack-9.1.6.js",
  /**/"/assets/version.json",
  /**/
];

const PRE_CACHED_ASSETS = [
  '/assets/icons/favicon.ico',
  /**/"/assets/img/back3.jpg",/**/
  /**/"/assets/img/satellite.png",/**/
  /**/"/assets/img/swipe.svg",
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/",
  "/offline.html",
  /**/
];

const SITE_URL = new URL("/", self.location);
const OFFLINE_PAGE_URL = new URL("/offline.html", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/icomoon/fonts/') &&
    x.endsWith('.woff') 
  ));
  return [ICON_FONT, ...fontURLs];
}
 
async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/katex/dist/fonts/') &&
    x.endsWith('.woff2')
  ));
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size. 
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/getGoogleFontsFiles(),/**/
    /**/
    /**/getMathJaxFiles(),/**/
  ]);

  const jsFiles = STATIC_FILES.filter(url => (
    url.startsWith('/assets/js/') &&
    url.endsWith('.js') && !url.includes('LEGACY')
  ));

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw/"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 

