// global language configuation
var g_lang = 'en';

window.onload = function() {
	
	// get lang parameter from url 
	var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } 
		else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } 
		else {
            query_string[pair[0]].push(pair[1]);
        }
    }
	
	var lang = query_string["lang"];
	
 if ( lang === 'cn' ) {
        g_lang = 'cn';
		document.title = "第七史诗 裝備評分工具基础版";
        document.getElementsByTagName('meta')["keywords"].content = "第七史诗装备评分器,第七史诗装备计算器,e7装备评分器,epic7装备评分器,epic seven装备评分器";
        document.getElementsByTagName('meta')["description"].content = "第七史诗 装备评分计算器，计算装备副属性强化的好坏程度";
        
        
        
        document.getElementById("gus-atkper").innerHTML = "攻击力%";
		document.getElementById("gus-defper").innerHTML = "防御力%";
		document.getElementById("gus-hpper").innerHTML = "生命%";
		document.getElementById("gus-atkflat").innerHTML = "攻击力";
		document.getElementById("gus-defflat").innerHTML = "防御力";
		document.getElementById("gus-hpflat").innerHTML = "生命";
		document.getElementById("gus-critch").innerHTML = "暴击几率";
		document.getElementById("gus-critdmg").innerHTML = "暴击伤害";
		document.getElementById("gus-spd").innerHTML = "速度";
		document.getElementById("gus-eff").innerHTML = "效果命中";
		document.getElementById("gus-res").innerHTML = "效果抗性";
		
		document.getElementById("label-atkper").innerHTML = "攻击力%";
		document.getElementById("label-defper").innerHTML = "防御力%";
		document.getElementById("label-hpper").innerHTML = "生命%";
		document.getElementById("label-atkflat").innerHTML = "攻击力";
		document.getElementById("label-defflat").innerHTML = "防御力";
		document.getElementById("label-hpflat").innerHTML = "生命";
		document.getElementById("label-critch").innerHTML = "暴击几率";
		document.getElementById("label-critdmg").innerHTML = "暴击伤害";
		document.getElementById("label-spd").innerHTML = "速度";
		document.getElementById("label-eff").innerHTML = "效果命中";
		document.getElementById("label-res").innerHTML = "效果抗性";
		document.getElementById("label-score").innerHTML = "分数";
		document.getElementById("btn-calc").innerHTML = "计算";
		document.getElementById("btn-reset").innerHTML = "重置";
	}
    
	// else {
    //     document.title = "Epic7 Gear's Substat";
    //     document.getElementsByTagName('meta')["keywords"].content = "Epic7 Gear's Substat,e7 Gear's Substat,epic seven Gear's Substat";
    //     document.getElementsByTagName('meta')["description"].content = "Epic7 Gear's Substat,calculate the score of gear's substats rolls";
        
      
        
    //     document.getElementById("gus-atkper").innerHTML = "Attack%";
	// 	document.getElementById("gus-defper").innerHTML = "Defence%";
	// 	document.getElementById("gus-hpper").innerHTML = "Health%";
	// 	document.getElementById("gus-atkflat").innerHTML = "Attack";
	// 	document.getElementById("gus-defflat").innerHTML = "Defence";
	// 	document.getElementById("gus-hpflat").innerHTML = "Health";
	// 	document.getElementById("gus-critch").innerHTML = "Cri.Chance";
	// 	document.getElementById("gus-critdmg").innerHTML = "Cri.Damage";
	// 	document.getElementById("gus-spd").innerHTML = "Speed";
	// 	document.getElementById("gus-eff").innerHTML = "Effectiveness";
	// 	document.getElementById("gus-res").innerHTML = "Eff.Resist";
		
	// 	document.getElementById("label-atkper").innerHTML = "Attack%";
	// 	document.getElementById("label-defper").innerHTML = "Defence%";
	// 	document.getElementById("label-hpper").innerHTML = "Health%";
	// 	document.getElementById("label-atkflat").innerHTML = "Attack";
	// 	document.getElementById("label-defflat").innerHTML = "Defence";
	// 	document.getElementById("label-hpflat").innerHTML = "Health";
	// 	document.getElementById("label-critch").innerHTML = "Cri.Chance";
	// 	document.getElementById("label-critdmg").innerHTML = "Cri.Damage";
	// 	document.getElementById("label-spd").innerHTML = "Speed";
	// 	document.getElementById("label-eff").innerHTML = "Effectiveness";
	// 	document.getElementById("label-res").innerHTML = "Eff.Resist";
	// 	document.getElementById("label-score").innerHTML = "Score";
	// 	document.getElementById("btn-calc").innerHTML = "Calc";
	// 	document.getElementById("btn-reset").innerHTML = "Reset";
	// }
    
    
	
	// zh, en
	// console.log( "lang=" + g_lang );
	
	reset();
};

function getSubstatName( id ) {
	
 if ( g_lang === 'cn' ){
		switch( id ) {
		case 0: return "攻击";
		case 1: return "生命";
		case 2: return "防御";
		case 3: return "命中";
		case 4: return "抗性";
		case 5: return "速度";
		case 6: return "暴击机率";
		case 7: return "暴击伤害";

		default: return "属性(" + id + ")";
		}
	}
	else {
		switch( id ) {
		case 0: return "Attack%";
		case 1: return "Health%";
		case 2: return "Defense%";
		case 3: return "Effectiveness";
		case 4: return "Effect.Resist";
		case 5: return "Speed";
		case 6: return "Crit Chance";
		case 7: return "Crit Dmg";
		case 8: return "Attack";
		case 9: return "Defense";
		case 10: return "HP";
		default: return "Substat(" + id + ")";
		}
    }        
}









function getSubstat() {
	
	var data = [0, 0, 0, 0, 0, 0, 0, 0,];
	
	// data[0] = parseInt( document.getElementById("atkper").value );
	// data[1] = parseInt( document.getElementById("defper").value );
	// data[2] = parseInt( document.getElementById("hpper").value );
	// data[3] = parseInt( document.getElementById("eff").value );
	// data[4] = parseInt( document.getElementById("res").value );
	// data[5] = parseInt( document.getElementById("critdmg").value );
	// data[6] = parseInt( document.getElementById("critch").value );
	// data[7] = parseInt( document.getElementById("spd").value );
	// data[8] = parseInt( document.getElementById("atkflat").value );
	// data[9] = parseInt( document.getElementById("defflat").value );
	// data[10] = parseInt( document.getElementById("hpflat").value );
	data[0] = parseInt( document.getElementById("atkper").value );
	data[1] = parseInt( document.getElementById("hpper").value );
	data[2] = parseInt( document.getElementById("defper").value );
	data[3] = parseInt( document.getElementById("eff").value );
	data[4] = parseInt( document.getElementById("res").value );
	data[5] = parseInt( document.getElementById("critch").value );
	data[6] = parseInt( document.getElementById("critdmg").value );
	data[7] = parseInt( document.getElementById("spd").value );

	
	return data;
	
}

function getSubstatCount() {
	
	var data = getSubstat();
	var total_substat_count = 0;
	
	for ( var idx = 0; idx < 11; idx++ ) {
		if ( ! isNaN( data[idx] ) && data[idx] > 0 ) {
			total_substat_count ++;
		}
	}
	
	return total_substat_count;
}







function reset() {
	
	document.getElementById("atkper").value  = "";
	document.getElementById("critch").value  = "";
	document.getElementById("critdmg").value  = "";
	document.getElementById("hpper").value  = "";
	document.getElementById("defper").value  = "";
	document.getElementById("spd").value  = "";
	document.getElementById("eff").value  = "";
	document.getElementById("res").value  = "";

	

	document.getElementById("score").innerHTML = "0";


}





function calc() {


	calnew()

}

function calnew(){
	score = calcScoreNew()
	report( score )
}


function calcScoreNew( ) {
	
	var data = getSubstat();

	var enc_idx = 0;
	var score = 0;
	var has_score = false;
	var tmp;
	
	// calculate the score
	for ( var idx = 0; idx < 8; idx ++ ) {

		var substat_max_tmp = 0; // to handle the special case for speed
		
		if ( isNaN( data[idx] ) || data[idx] <= 0 ) {
			continue;
		}
		
		// the maximum substate for lv85 speed could be 5, but it extremely rare.
		// so we use 4 as maximum to calculate the score 
		
		tmp = data[idx]

		if ( idx === 5 ) {

			tmp = tmp * 1.5;
		}
		if ( idx === 6 ) {

			tmp = tmp * 1.125;
		}
        
		if ( idx === 7 ) {

			tmp = tmp * 2;
		}
        
        
        // cut the score to zero if it is not a useful substats
        // 0. atk%, 1. hp%, 2. def%, 3. eff%, 4. res%
	    // 5. critch
	    // 6. critdmg
	    // 7. spd
	    //

			
		// console.log( "score data[" + getSubstatName(idx) + "]" + data[idx] +
		//  " substat_min:" + substat_min[idx] +
		// " substat_max:" + substat_max[idx] +
		// " enc_time[" + enc_idx + "]" + enc_time[enc_idx] +
		// " score:" + tmp );

		has_score = true;		
		score = score + tmp;			
		enc_idx ++;
	}
	
	if ( has_score ) 
		return score;
	else
		return false;
}






// function calcScore( enc_time ) {
	
// 	var data = getSubstat();
// 	var substat_min = getSubstatMin();
// 	var substat_max = getSubstatMax();
//     var usef_sub = getGearUsefulSub();
// 	var enc_idx = 0;
// 	var score = 0;
// 	var has_score = false;
// 	var tmp;
	
// 	// calculate the score
// 	for ( var idx = 0; idx < 11; idx ++ ) {
		
// 		var substat_max_tmp = 0; // to handle the special case for speed
		
// 		if ( isNaN( data[idx] ) || data[idx] <= 0 ) {
// 			continue;
// 		}
		
// 		// the maximum substate for lv85 speed could be 5, but it extremely rare.
// 		// so we use 4 as maximum to calculate the score 
// 		if (( getGearLevel() === "85" || getGearLevel === "90r" ) && idx === 7 ) {
// 			substat_max_tmp = 4;
// 		}
// 		else {
// 			substat_max_tmp = substat_max[idx];
// 		}
		
// 		if ( isReforged() ) {
// 			tmp = ( data[idx] - substat_min[idx] * enc_time[enc_idx] - getReforge( enc_time[enc_idx] - 1)[idx] ) * 100 / 
// 				( substat_max_tmp - substat_min[idx] );
// 		}
// 		else {
// 			tmp = ( data[idx] - substat_min[idx] * enc_time[enc_idx] ) * 100 / 
// 				( substat_max_tmp - substat_min[idx] );
// 		}
			
// 		// cut the score to half if it is flat atk, def or flat hp
// 		if ( idx === 8 || idx === 9 || idx === 10 ) {
// 			// console.log( "calcScore, cut the score type " + getSubstatName(idx) + " from " + tmp + " to " + ( tmp / 2 ));
// 			tmp = tmp / 2;
// 		}
        
//         // cut the score to zero if it is not a useful substats
//         // 0. atk%, 1. def%, 2. hp%, 3. eff%, 4. res%
// 	    // 5. critdmg
// 	    // 6. critch
// 	    // 7. spd
// 	    // 8. atk flat, 9. def flat, 10. hp flat
//         if (idx === 0 && !usef_sub.includes("gus-atkper") ){
//             tmp = 0;
//         }
//         if (idx === 1 && !usef_sub.includes("gus-defper") ){
//             tmp = 0;
//         }
//         if (idx === 2 && !usef_sub.includes("gus-hpper") ){
//             tmp = 0;
//         }
//         if (idx === 3 && !usef_sub.includes("gus-eff") ){
//             tmp = 0;
//         }
//         if (idx === 4 && !usef_sub.includes("gus-res") ){
//             tmp = 0;
//         }
//         if (idx === 5 && !usef_sub.includes("gus-critdmg") ){
//             tmp = 0;
//         }
//         if (idx === 6 && !usef_sub.includes("gus-critch") ){
//             tmp = 0;
//         }
//         if (idx === 7 && !usef_sub.includes("gus-spd") ){
//             tmp = 0;
//         }
//         if (idx === 8 && !usef_sub.includes("gus-atkflat") ){
//             tmp = 0;
//         }
//         if (idx === 9 && !usef_sub.includes("gus-defflat") ){
//             tmp = 0;
//         }
//         if (idx === 10 && !usef_sub.includes("gus-hpflat") ){
//             tmp = 0;
//         }
        
			
// 		// console.log( "score data[" + getSubstatName(idx) + "]" + data[idx] +
// 		//  " substat_min:" + substat_min[idx] +
// 		// " substat_max:" + substat_max[idx] +
// 		// " enc_time[" + enc_idx + "]" + enc_time[enc_idx] +
// 		// " score:" + tmp );

// 		has_score = true;		
// 		score = score + tmp;			
// 		enc_idx ++;
// 	}
	
// 	if ( has_score ) 
// 		return score;
// 	else
// 		return false;
// }



function report( score ) {
	

	
	document.getElementById("score").innerHTML = "" + score;

	
}