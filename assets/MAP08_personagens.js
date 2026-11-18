/* MAP08 — Biblioteca de personagens vetoriais (plano visual M01)
   Estilo: chapado, sem contorno, corpo inteiro, proporções realistas, com detalhes de acabamento
   (mãos com dedos, punhos, barras dobradas, dobras de tecido, cabelo com textura e brilho,
   nariz em traço, sombra de pescoço). Referência de estilo indicada pela direção: personagens COP01.
   Adaptação Sicredi: camisa clara com marca verde, crachá, contexto agro (chapéu de palha, xadrez).
   Uso: MAP08P.fig(x, y, altura, opcoes) devolve um <g> SVG com os pés em (x, y).            */
(function(){
const G='#62C633',E='#136D38';
const PELE={a:'#F8B394',b:'#E59C74',c:'#B87650',d:'#7D4C34'};
const CAB={castanho:'#6E4532',escuro:'#2E2220',ruivo:'#9A5434',grisalho:'#D8D2CA',branco:'#ECE8E2',loiro:'#C99A55'};
function tom(hex,f){const n=parseInt(hex.slice(1),16);let c=[n>>16,(n>>8)&255,n&255];c=c.map(v=>f<1?Math.round(v*f):Math.round(v+(255-v)*(f-1)));return '#'+c.map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('')}
const esp=(d)=>d; // utilitário para legibilidade

function mao(x,y,pe,pe2,dir,abre){ // mão relaxada apontando para baixo; dir=1 direita do observador
  const s=dir;
  return `<g transform="translate(${x} ${y}) scale(${s} 1)">
   <path d="M-9 0 C-12 8 -12 20 -8 27 C-5 32 3 33 7 29 C10 25 11 14 10 4 L9 0Z" fill="${pe}"/>
   <path d="M-11 9 C-15 12 -16 17 -13 19 C-11 20 -9 17 -8 14Z" fill="${pe}"/>
   <path d="M-3 17 V28 M2 16 V29 M6 15 V26" stroke="${pe2}" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}
function maoCintura(x,y,pe,pe2,dir){
  return `<g transform="translate(${x} ${y}) scale(${dir} 1)"><path d="M-14 -6 C-6 -10 6 -10 12 -4 C15 0 13 6 8 7 L-12 8 C-16 6 -17 -2 -14 -6Z" fill="${pe}"/><path d="M-2 -6 L-4 6 M4 -6 L3 6" stroke="${pe2}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 -6 C12 -10 16 -8 15 -4" fill="none" stroke="${pe2}" stroke-width="1.4"/></g>`;
}
function fig(x,y,h,o){
 o=o||{};
 const s=h/560, pe=o.pele||PELE.a, pe2=tom(pe,.84), pe3=tom(pe,.92),
  ca=o.cab||CAB.castanho, ca2=tom(ca,.75), ca3=tom(ca,1.35),
  top=o.top||'#F1EEEC', top2=tom(top,.9), top3=tom(top,.95),
  cal=o.calca||'#33393A', cal2=tom(cal,.78), cal3=tom(cal,1.18),
  sap=o.sapato||'#4A3430', sap2=tom(sap,1.35), pose=o.pose||'baixo', fem=!!o.fem;
 let g='';
 /* cabelo de trás */
 if(o.cabelo==='longo')g+=`<path d="M70 58 C62 22 86 12 104 14 C128 16 140 34 133 62 C138 84 145 102 137 120 C128 128 114 118 117 102 L83 102 C86 118 72 128 63 120 C55 102 63 84 70 58Z" fill="${ca}"/><path d="M68 100 C66 110 68 118 74 120 M132 100 C134 110 132 118 126 120" stroke="${ca2}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 if(o.cabelo==='ondulado')g+=`<path d="M70 58 C62 20 88 12 104 14 C128 16 140 34 132 62 C138 76 140 92 134 104 C128 110 120 104 120 96 L80 96 C80 104 72 110 66 104 C60 92 62 76 70 58Z" fill="${ca}"/><path d="M64 90 C70 86 70 96 66 100 M136 90 C130 86 130 96 134 100" stroke="${ca2}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 if(o.cabelo==='cacheado')g+=[[76,40,15],[90,26,15],[110,24,15],[124,38,15],[72,58,13],[128,58,13],[74,76,12],[126,76,12],[100,20,14]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${ca}"/>`).join('')+[[86,30],[112,28],[122,52],[78,52]].map(c=>`<path d="M${c[0]-5} ${c[1]} q5 -6 10 0" stroke="${ca2}" stroke-width="2" fill="none"/>`).join('');
 /* pernas */
 const ext=fem?2:0;
 g+=`<path d="M${55-ext} 302 H100 V330 L97 528 H63 L${58-ext} 420Z" fill="${cal}"/><path d="M100 302 H${145+ext} L${142+ext} 420 L137 528 H103 L100 330Z" fill="${cal}"/>`;
 g+=`<path d="M100 330 L101.5 470 L103 330Z" fill="${cal2}"/><path d="M137 420 L134 528 H128Z" fill="${cal2}" opacity=".55"/><path d="M63 420 L66 528 H72Z" fill="${cal2}" opacity=".35"/>`;
 g+=`<path d="M72 420 Q80 426 88 420 M112 420 Q120 426 128 420" stroke="${cal2}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
 if(o.barra!==false)g+=`<path d="M62 510 H98 V528 H62Z M102 510 H138 V528 H102Z" fill="${cal3}"/><path d="M62 510 H98 M102 510 H138" stroke="${cal2}" stroke-width="1.4"/>`;
 /* sapatos */
 g+=`<path d="M64 528 H97 C99 536 99 546 97 551 H54 C47 551 47 543 54 537 C58 533 61 530 64 528Z" fill="${sap}"/><path d="M55 543 C58 536 66 533 74 537 C70 540 62 542 55 543Z" fill="${sap2}"/><rect x="51" y="549" width="47" height="5" rx="2" fill="${tom(sap,.7)}"/>`;
 g+=`<path d="M103 528 H136 C139 530 142 533 146 537 C153 543 153 551 146 551 H103 C101 546 101 536 103 528Z" fill="${sap}"/><path d="M145 543 C142 536 134 533 126 537 C130 540 138 542 145 543Z" fill="${sap2}"/><rect x="102" y="549" width="47" height="5" rx="2" fill="${tom(sap,.7)}"/>`;
 /* braços de trás (pose cintura usa cotovelo para fora) */
 const L=fem?60:56, R=200-L; // ombros
 const mangaBaixo=(lado)=>{const k=lado<0?0:1;const d=k?`M${R} 128 C${R+10} 136 ${R+14} 156 ${R+16} 180 L${R+20} 262 L${R+0} 264 L${R-6} 190Z`:`M${L} 128 C${L-10} 136 ${L-14} 156 ${L-16} 180 L${L-20} 262 L${L} 264 L${L+6} 190Z`;
   const cx=k?R+10:L-10;
   return `<path d="${d}" fill="${top}"/><path d="${k?`M${R+6} 180 L${R+10} 258 L${R+2} 258Z`:`M${L-6} 180 L${L-10} 258 L${L-2} 258Z`}" fill="${top2}" opacity=".7"/><path d="${k?`M${R-1} 258 L${R+21} 256 L${R+22} 274 L${R} 276Z`:`M${L+1} 258 L${L-21} 256 L${L-22} 274 L${L} 276Z`}" fill="${top3}"/><path d="${k?`M${R+2} 262 L${R+20} 261`:`M${L-2} 262 L${L-20} 261`}" stroke="${top2}" stroke-width="1.4"/>`+mao(cx,274,pe,pe2,k?1:-1);};
 /* tronco */
 const hem=o.porFora?316:300;
 g+=`<path d="M88 112 H112 C126 114 ${R+2} 118 ${R+8} 128 C${R+14} 140 ${R+12} 162 ${R+8} 182 L${R+4} ${hem} H${L-4} L${L-8} 182 C${L-12} 162 ${L-14} 140 ${L-8} 128 C${L-2} 118 74 114 88 112Z" fill="${top}"/>`;
 g+=`<path d="M${R-6} 124 C${R+4} 134 ${R+8} 160 ${R+4} 190 L${R+2} ${hem} H${R-12} C${R-8} 240 ${R-6} 180 ${R-10} 140Z" fill="${top2}" opacity=".55"/>`;
 g+=`<path d="M72 196 C76 226 76 250 73 276 M128 150 L134 184 M78 ${hem-12} Q90 ${hem-18} 100 ${hem-10}" stroke="${top2}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
 if(o.xadrez)g+=`<g opacity=".28" stroke="${o.xadrez}" stroke-width="4">${[150,180,210,240,270].map(v=>`<path d="M${L-6} ${v} H${R+6}"/>`).join('')}${[70,90,110,130].map(v=>`<path d="M${v} 120 V${hem}"/>`).join('')}</g>`;
 if(o.colete)g+=`<path d="M${L-6} 132 C${L} 122 80 116 90 116 L96 ${hem} H${L-4} L${L-8} 182Z" fill="${o.colete}"/><path d="M${R+6} 132 C${R} 122 120 116 110 116 L104 ${hem} H${R+4} L${R+8} 182Z" fill="${tom(o.colete,.88)}"/><rect x="72" y="210" width="16" height="12" rx="2" fill="${tom(o.colete,.8)}"/>`;
 if(!o.porFora)g+=`<rect x="${L-4}" y="294" width="${R-L+8}" height="11" fill="${tom(cal,.62)}"/><rect x="94" y="294" width="13" height="11" rx="2" fill="none" stroke="#B9B2A8" stroke-width="2"/>`;
 g+=`<path d="M100 134 V${hem-8}" stroke="${top2}" stroke-width="1.5"/>`;
 if(o.marca)g+=`<g transform="translate(124 168) scale(.9)"><path d="M0 -8 C4 -4 4 4 0 8 C-4 4 -4 -4 0 -8Z" fill="${G}"/><path d="M-8 0 C-4 -4 4 -4 8 0 C4 4 -4 4 -8 0Z" fill="${E}"/><circle r="1.6" fill="#fff"/></g>`;
 if(o.cracha)g+=`<path d="M88 118 L96 196 M112 118 L104 196" stroke="${G}" stroke-width="3"/><rect x="88" y="192" width="24" height="32" rx="3" fill="#fff"/><rect x="92" y="197" width="16" height="8" rx="1" fill="${G}"/><path d="M93 211 H107 M93 216 H103" stroke="#B9C2BC" stroke-width="2"/>`;
 /* braços */
 if(pose==='baixo')g+=mangaBaixo(-1)+mangaBaixo(1);
 if(pose==='cintura'){
  for(const k of [-1,1]){const X=v=>100+k*(v-100),sh=k<0?L:R,c=k<0?top:top2;
   g+=`<path d="M${sh} 126 C${X(42)} 136 ${X(30)} 160 ${X(24)} 196 L${X(40)} 206 C${X(44)} 180 ${X(50)} 160 ${X(58)} 150Z" fill="${top}"/>`;
   g+=`<path d="M${X(24)} 192 L${X(40)} 204 L${X(66)} 276 L${X(52)} 284Z" fill="${c}"/><path d="M${X(50)} 268 L${X(64)} 262 L${X(70)} 276 L${X(56)} 284Z" fill="${top3}"/>`;
   g+=maoCintura(X(66),286,pe,pe2,k<0?1:-1);}
 }
 if(pose==='pasta'){
  g+=mangaBaixo(1);
  g+=`<path d="M${L} 128 C${L-10} 140 ${L-12} 170 ${L-10} 214 L${L+8} 218 C${L+8} 190 ${L+8} 160 ${L+12} 146Z" fill="${top}"/>`;
  g+=`<g transform="rotate(-9 92 190)"><rect x="64" y="148" width="54" height="78" rx="4" fill="${o.pastaCor||'#2B3331'}"/><rect x="64" y="148" width="7" height="78" rx="2" fill="${tom(o.pastaCor||'#2B3331',1.4)}"/></g>`;
  g+=`<path d="M${L-10} 206 C${L+4} 218 ${L+34} 216 ${L+52} 204 L${L+46} 190 C${L+32} 198 ${L+12} 200 ${L} 194Z" fill="${top}"/><path d="M${L+42} 192 L${L+54} 186 L${L+58} 202 L${L+48} 208Z" fill="${top3}"/>`;
  g+=`<g transform="translate(${L+62} 192) rotate(-20)"><path d="M-8 -9 C0 -13 12 -10 14 -2 C15 6 8 11 0 10 L-8 8Z" fill="${pe}"/><path d="M2 -9 V8 M7 -8 V7" stroke="${pe2}" stroke-width="1.5" stroke-linecap="round"/><path d="M-6 -9 C-4 -16 2 -17 4 -12" fill="${pe}"/></g>`;
 }
 if(pose==='tablet'){
  g+=`<path d="M${L} 128 C${L-12} 140 ${L-14} 170 ${L-12} 212 L${L+4} 218 C${L+6} 190 ${L+6} 160 ${L+10} 146Z" fill="${top}"/><path d="M${L-12} 204 C${L-2} 222 ${L+20} 230 ${L+36} 226 L${L+34} 210 C${L+20} 212 ${L+8} 206 ${L+2} 196Z" fill="${top}"/>`;
  g+=`<path d="M${R} 128 C${R+12} 140 ${R+14} 170 ${R+12} 212 L${R-4} 218 C${R-6} 190 ${R-6} 160 ${R-10} 146Z" fill="${top}"/><path d="M${R+12} 204 C${R+2} 222 ${R-20} 230 ${R-36} 226 L${R-34} 210 C${R-20} 212 ${R-8} 206 ${R-2} 196Z" fill="${top2}"/>`;
  g+=`<rect x="70" y="188" width="60" height="42" rx="5" fill="#2B3331"/><rect x="74" y="192" width="52" height="34" rx="3" fill="#CFEBC0"/><path d="M80 202 H112 M80 210 H104" stroke="${E}" stroke-width="3" stroke-linecap="round"/>`;
  g+=`<ellipse cx="73" cy="218" rx="8" ry="9" fill="${pe}"/><ellipse cx="127" cy="218" rx="8" ry="9" fill="${pe}"/><path d="M71 212 L75 224 M129 212 L125 224" stroke="${pe2}" stroke-width="1.4"/>`;
 }
 if(pose==='aceno'){
  g+=mangaBaixo(-1);
  g+=`<path d="M${R} 128 C${R+14} 120 ${R+24} 98 ${R+28} 70 L${R+46} 74 C${R+44} 106 ${R+28} 140 ${R+10} 154Z" fill="${top}"/><path d="M${R+26} 66 L${R+48} 70 L${R+46} 84 L${R+26} 80Z" fill="${top3}"/>`;
  g+=`<g transform="translate(${R+38} 54)"><path d="M-10 14 C-14 2 -12 -14 -6 -20 L-4 -4 L-2 -24 C-1 -28 4 -28 4 -24 L4 -6 L7 -24 C8 -28 13 -27 12 -23 L11 -4 L14 -18 C15 -22 20 -21 19 -17 L16 4 C20 0 25 2 23 7 C19 14 14 20 6 22 C-2 23 -8 20 -10 14Z" fill="${pe}"/></g>`;
 }
 if(pose==='braco'){ /* um braço estendido apontando/oferecendo */
  g+=mangaBaixo(-1);
  g+=`<path d="M${R} 128 C${R+14} 136 ${R+22} 152 ${R+30} 170 L${R+70} 196 L${R+62} 212 L${R+16} 190Z" fill="${top}"/><path d="M${R+62} 192 L${R+74} 198 L${R+66} 214 L${R+56} 208Z" fill="${top3}"/><g transform="translate(${R+80} 208) rotate(-60)"><path d="M-9 0 C-12 8 -12 18 -8 24 C-5 28 3 29 7 25 C10 21 11 12 10 4 L9 0Z" fill="${pe}"/></g>`;
 }
 /* pescoço e cabeça */
 g+=o.infantil?'<g transform="translate(100 118) scale(1.32) translate(-100 -118)">':'<g>';
 g+=`<path d="M89 88 H111 V114 C106 120 94 120 89 114Z" fill="${pe}"/><path d="M89 94 C94 106 106 106 111 94 V108 C104 114 96 114 89 108Z" fill="${pe2}"/>`;
 g+=`<path d="M86 112 L100 134 L90 142 L78 120Z" fill="${top3}"/><path d="M114 112 L100 134 L110 142 L122 120Z" fill="${top2}"/>`;
 g+=`<ellipse cx="73.5" cy="64" rx="6.5" ry="9.5" fill="${pe}"/><path d="M73 58 C70 62 71 68 74 70" stroke="${pe2}" stroke-width="1.6" fill="none"/><ellipse cx="126.5" cy="64" rx="6.5" ry="9.5" fill="${pe}"/><path d="M127 58 C130 62 129 68 126 70" stroke="${pe2}" stroke-width="1.6" fill="none"/>`;
 if(o.brinco)g+=`<circle cx="73" cy="76" r="2.4" fill="#fff"/><circle cx="127" cy="76" r="2.4" fill="#fff"/>`;
 g+=`<path d="M74 56 C74 36 86 26 100 26 C114 26 126 36 126 56 C126 80 116 98 100 100 C84 98 74 80 74 56Z" fill="${pe}"/>`;
 g+=`<path d="M118 40 C124 50 125 66 122 78 C120 88 112 96 104 99 C114 92 120 80 120 64 C120 54 120 46 118 40Z" fill="${pe3}"/>`;
 if(o.barba)g+=`<path d="M74 62 C74 86 86 104 100 104 C114 104 126 86 126 62 C122 76 116 80 110 80 C106 78 104 76 100 76 C96 76 94 78 90 80 C84 80 78 76 74 62Z" fill="${ca}"/><path d="M90 86 C95 91 105 91 110 86 C105 89 95 89 90 86Z" fill="#E7A0A0"/><path d="M84 92 Q90 96 96 94 M104 94 Q110 96 116 92" stroke="${ca2}" stroke-width="1.6" fill="none"/>`;
 // rosto
 g+=`<ellipse cx="88.5" cy="62" rx="2.8" ry="3.6" fill="#2A1F1C"/><ellipse cx="111.5" cy="62" rx="2.8" ry="3.6" fill="#2A1F1C"/><circle cx="89.4" cy="60.8" r=".9" fill="#fff"/><circle cx="112.4" cy="60.8" r=".9" fill="#fff"/>`;
 g+=`<path d="M82 52 Q88.5 48.5 95 51.5 M105 51.5 Q111.5 48.5 118 52" stroke="${o.cabelo==='calvo'||o.barba?ca2:tom(ca,.7)}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
 g+=`<path d="M100.5 60 C100 68 96.5 73 98.5 76.5 C100.5 78.5 104 78 106 76" stroke="${pe2}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
 if(!o.barba)g+=`<path d="M90 84.5 C95 91.5 105 91.5 110 84.5 C104 87.5 96 87.5 90 84.5Z" fill="#C9605A"/><path d="M92 86 C96 89 104 89 108 86" stroke="#fff" stroke-width="1.6" fill="none" opacity=".85"/>`;
 g+=`<ellipse cx="83" cy="74" rx="5.5" ry="3.2" fill="#E8836F" opacity=".35"/><ellipse cx="117" cy="74" rx="5.5" ry="3.2" fill="#E8836F" opacity=".35"/>`;
 if(o.rugas)g+=`<path d="M80 66 Q78 68 79 71 M120 66 Q122 68 121 71 M92 44 Q100 42 108 44" stroke="${pe2}" stroke-width="1.3" fill="none"/>`;
 if(o.oculos)g+=`<g fill="none" stroke="#3A3A3A" stroke-width="2.4"><rect x="79" y="54" width="19" height="16" rx="5"/><rect x="102" y="54" width="19" height="16" rx="5"/><path d="M98 61 H102 M79 59 L74 57 M121 59 L126 57"/></g><path d="M83 57 L87 57" stroke="#fff" stroke-width="1.6" opacity=".8"/>`;
 // cabelo da frente
 const F={
  curto:`<path d="M72 62 C66 30 82 16 102 16 C124 16 134 32 129 60 C126 48 120 40 108 38 C96 38 86 42 80 48 C76 52 74 56 72 62Z" fill="${ca}"/><path d="M84 30 C92 25 101 27 108 24 M96 21 C104 18 114 22 121 28 M80 40 C86 36 92 36 98 34" stroke="${ca2}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M90 22 C100 18 114 20 120 26 C110 22 100 22 90 26Z" fill="${ca3}" opacity=".55"/>`,
  longo:`<path d="M74 64 C72 36 88 24 104 24 C120 24 130 36 128 58 C120 44 108 36 96 40 C86 44 80 52 74 64Z" fill="${ca}"/><path d="M82 38 C90 30 100 30 108 30 M90 46 C96 40 104 38 112 38" stroke="${ca2}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M84 30 C96 22 112 22 120 30 C110 26 96 26 84 34Z" fill="${ca3}" opacity=".55"/>`,
  ondulado:`<path d="M74 64 C70 34 88 22 104 22 C122 22 132 36 128 60 C122 46 112 38 100 40 C90 42 82 50 74 64Z" fill="${ca}"/><path d="M80 44 C86 38 84 32 92 30 C98 28 98 36 106 32 C112 30 114 36 120 36" stroke="${ca2}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M84 28 C96 20 114 20 122 30 C112 26 98 26 84 32Z" fill="${ca3}" opacity=".55"/>`,
  coque:`<circle cx="102" cy="14" r="13" fill="${ca}"/><path d="M96 8 C100 4 108 6 110 12" stroke="${ca2}" stroke-width="2" fill="none"/><path d="M73 60 C70 32 86 22 102 22 C120 22 132 34 128 58 C122 44 112 38 100 38 C88 40 80 48 73 60Z" fill="${ca}"/><path d="M84 34 C92 28 104 28 114 32" stroke="${ca2}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  cacheado:`<path d="M76 50 C80 34 92 28 102 30 C114 30 122 38 124 50 C116 42 106 40 96 42 C88 44 82 46 76 50Z" fill="${ca}"/>`,
  calvo:`<path d="M72 64 C70 52 72 44 76 38 C78 46 78 54 80 62Z M128 64 C130 52 128 44 124 38 C122 46 122 54 120 62Z" fill="${ca}"/><path d="M84 30 C94 24 108 24 116 30" stroke="${pe2}" stroke-width="1.6" fill="none" opacity=".6"/>`,
  raspado:`<path d="M74 54 C74 34 86 24 100 24 C114 24 126 34 126 54 C120 40 110 34 100 34 C90 34 80 40 74 54Z" fill="${ca}" opacity=".85"/>`
 };
 g+=F[o.cabelo||'curto']||'';
 if(o.chapeu)g+=`<ellipse cx="100" cy="36" rx="50" ry="10" fill="#C99E57"/><path d="M76 36 C76 12 88 6 100 6 C112 6 124 12 124 36Z" fill="#DDB872"/><path d="M76 26 H124 V34 H76Z" fill="${E}"/><path d="M84 14 C90 10 98 9 104 10" stroke="#EFD49A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M58 38 C78 44 122 44 142 38" stroke="#B48A48" stroke-width="2" fill="none"/>`;
 g+='</g>';
 return `<g transform="translate(${x-100*s} ${y-560*s}) scale(${s})">${g}</g>`;
}
/* Elenco proposto (adaptação Sicredi) */
const ELENCO={
 produtor:{pele:PELE.b,cab:CAB.castanho,cabelo:'curto',barba:true,chapeu:true,top:'#6E9E5B',xadrez:'#2F5A2A',calca:'#5876A0',sapato:'#5A3B2A',porFora:false},
 produtora:{fem:true,pele:PELE.c,cab:CAB.escuro,cabelo:'longo',top:'#F3C77A',calca:'#5876A0',sapato:'#5A3B2A',brinco:true},
 crianca:{infantil:true,pele:PELE.b,cab:CAB.castanho,cabelo:'curto',top:'#E07457',calca:'#C9B58C',sapato:'#F1EEEC',barra:false},
 idoso:{pele:PELE.a,cab:CAB.branco,cabelo:'calvo',barba:true,chapeu:true,rugas:true,top:'#ECE6D8',colete:'#3F6B4A',calca:'#6B5B4B',sapato:'#5A3B2A'},
 idosa:{fem:true,pele:PELE.a,cab:CAB.grisalho,cabelo:'coque',oculos:true,rugas:true,top:'#BFE0AE',calca:'#4A3A36',sapato:'#6B4A3A',brinco:true},
 gerente:{pele:PELE.d,cab:CAB.escuro,cabelo:'raspado',barba:true,top:'#F1EEEC',calca:'#33393A',marca:true,cracha:true},
 colaboradora:{fem:true,pele:PELE.a,cab:CAB.ruivo,cabelo:'ondulado',top:'#F1EEEC',calca:'#33393A',marca:true,cracha:true,oculos:true,brinco:true},
 colaborador:{pele:PELE.c,cab:CAB.escuro,cabelo:'cacheado',top:G,calca:'#33393A',cracha:true},
 mapfre:{fem:true,pele:PELE.b,cab:CAB.castanho,cabelo:'longo',top:'#D9232D',calca:'#33393A',brinco:true}
};
window.MAP08P={fig,ELENCO,PELE,CAB,tom,P:(k,x,y,h,extra)=>fig(x,y,h,Object.assign({},ELENCO[k],extra||{}))};
})();
