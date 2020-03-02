var express = require('express'),
	app = express(),
	fs = require('fs'),
	CsvReadableStream = require('csv-reader');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = 8080;

var name = "Teste";
var gieDataList = [];

// var marchData = fs.createReadStream('march_data_cleaned.csv', 'utf8');
// var m2Data = fs.createReadStream('may_data_cleaned.csv', 'utf8');
// var m1Data = fs.createReadStream('m1_data_cleaned.csv', 'utf8');
// var m2Data = fs.createReadStream('m2_data_cleaned.csv', 'utf8');
// var m3Data = fs.createReadStream('m3_data_cleaned.csv', 'utf8');
var month1Data = fs.createReadStream('19_2_july.csv', 'utf8');
var month2Data = fs.createReadStream('19_2_sep.csv', 'utf8');
var month3Data = fs.createReadStream('19_2_dec.csv', 'utf8');
// loser 0
// learner 10
// thinker 20
// hacker 30
// Engineer 40
// Expert 50


month1Data
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	if (row[0]!== undefined)
    	{ 
    		var gieDataJson = {
					"name":row[0],
					"Hardware_IoT":
						{
							"m1":
							{"scale": Number(row[10]), 'kra':row.slice(1, 10)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"AI_ML_Data_Science":
						{"m1":
							{"scale": Number(row[17]), 'kra':row.slice(11, 17)}, 
						"m2":
							{"scale": 0, 'kra':undefined},
						"m3":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Application_Development":
						{
							"m1":
							{"scale": Number(row[23]), 'kra':row.slice(18, 23)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"Industry_Product_Design":
						{
							"m1":
							{"scale": Number(row[29]), 'kra':row.slice(24, 29)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Platforms":
						{
							"m1":
							{"scale": Number(row[36]), 'kra':row.slice(30, 36)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"Programming_Application_Platform":
						{
							"m1":
							{"scale": Number(row[41]), 'kra':row.slice(37, 41)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"IP":
						{
							"m1":
							{"scale": Number(row[44]), 'kra':[Number(row[42]), Number(row[42]), Number(row[43])]}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					"Innovation":
						{
							"m1":
							{"scale": Number(row[52]), 'kra':row.slice(45, 52)}, 
							"m2":
							{"scale": 0, 'kra':undefined},
							"m3":
							{"scale": 0, 'kra':undefined},
						},
					};
    		gieDataList.push(gieDataJson);
    	}
    })
    .on('end', function (data) {
    	// console.log(gieDataList[0]);
        

        var index = 0;
		month2Data
		    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
		    .on('data', function (row) {
		    	
		    	if (row[0] == gieDataList[index]['name'])
		    	{ 


					gieDataList[index].Hardware_IoT.m2.kra = row.slice(1, 10);
					gieDataList[index].Hardware_IoT.m2.scale = Number(row[10])
			    	gieDataList[index].AI_ML_Data_Science.m2.kra= row.slice(11, 17);
			    	gieDataList[index].AI_ML_Data_Science.m2.scale=Number(row[17]);
			    	gieDataList[index].Software_Application_Development.m2.kra= row.slice(18, 23); 
			    	gieDataList[index].Software_Application_Development.m2.scale=Number(row[23]) 
			    	gieDataList[index].Industry_Product_Design.m2.kra= row.slice(24, 29);
			    	gieDataList[index].Industry_Product_Design.m2.scale=Number(row[29])
			    	gieDataList[index].Software_Platforms.m2.kra= row.slice(30, 36);
			    	gieDataList[index].Software_Platforms.m2.scale=Number(row[36])
			    	gieDataList[index].Programming_Application_Platform.m2.kra= row.slice(37, 41);
			    	gieDataList[index].Programming_Application_Platform.m2.scale=Number(row[41])
			    	gieDataList[index].IP.m2.kra= [Number(row[42]), Number(row[42]), Number(row[43])];
			    	gieDataList[index].IP.m2.scale=Number(row[44])
			    	gieDataList[index].Innovation.m2.kra= row.slice(45, 52);
			    	gieDataList[index].Innovation.m2.scale=Number(row[52]);       	
		        
		    	}
		    	index += 1;	        

		    })
		    .on('end', function (data) {
		    	var index = 0;
				month3Data
				    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
				    .on('data', function (row) {
				    	
				    	
				    	if (row[0] == gieDataList[index]['name'])
				    	{ 


							gieDataList[index].Hardware_IoT.m3.kra = row.slice(1, 10);
							gieDataList[index].Hardware_IoT.m3.scale = Number(row[10])
					    	gieDataList[index].AI_ML_Data_Science.m3.kra= row.slice(11, 17);
					    	gieDataList[index].AI_ML_Data_Science.m3.scale=Number(row[17]);
					    	gieDataList[index].Software_Application_Development.m3.kra= row.slice(18, 23); 
					    	gieDataList[index].Software_Application_Development.m3.scale=Number(row[23]) 
					    	gieDataList[index].Industry_Product_Design.m3.kra= row.slice(24, 29);
					    	gieDataList[index].Industry_Product_Design.m3.scale=Number(row[29])
					    	gieDataList[index].Software_Platforms.m3.kra= row.slice(30, 36);
					    	gieDataList[index].Software_Platforms.m3.scale=Number(row[36])
					    	gieDataList[index].Programming_Application_Platform.m3.kra= row.slice(37, 41);
					    	gieDataList[index].Programming_Application_Platform.m3.scale=Number(row[41])
					    	gieDataList[index].IP.m3.kra= [Number(row[42]), Number(row[42]), Number(row[43])];
					    	gieDataList[index].IP.m3.scale=Number(row[44])
					    	gieDataList[index].Innovation.m3.kra= row.slice(45, 52);
					    	gieDataList[index].Innovation.m3.scale=Number(row[52]);       	
				        
				    	}
				    	index += 1;	        

				    })
				    .on('end', function (data) {
				    	var toTal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				        var kra = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

				        for (ps of gieDataList){
				        	var localIndex = 0;
				        	for (key of Object.keys(ps)){
				        		if (key == "name") continue;
				        		toTal[localIndex] += ps[key]["m1"]["scale"];
				        		toTal[localIndex+1] += ps[key]["m2"]["scale"];
				        		toTal[localIndex+2] += ps[key]["m3"]["scale"];
				        		kra[localIndex].push(ps[key]["m1"]["kra"]);
				        		kra[localIndex+1].push(ps[key]["m2"]["kra"]);
				        		kra[localIndex+2].push(ps[key]["m3"]["kra"]);
				        		localIndex += 3;
				        	}
				        }

				        var sumKra = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
				        for (eachKraIndex of Object.keys(kra)){
				        	// console.log(kra[eachKraIndex])
				        	var init = true;
				        	for (eachCandidate of kra[eachKraIndex]){
				        		if (eachCandidate !== undefined){
				        			for (var index = 0; index < eachCandidate.length ; index++){
					        			if (init) {
					        				sumKra[eachKraIndex] = eachCandidate;
					        				init = false;
					        			}
					        			else{
					        				sumKra[eachKraIndex][index] += eachCandidate[index];
					        			}
					        			
				        			}

				        		}
				        		
				        		
				        	}
				        	for (eachLevelIndex of Object.keys(sumKra[eachKraIndex])){
				        		sumKra[eachKraIndex][eachLevelIndex] = sumKra[eachKraIndex][eachLevelIndex]/kra[eachKraIndex].length;
				        	}
				        }

				        var gieDataJson = {
								"name":"The Originals",
								"Hardware_IoT":
									{"m1":
										{"scale": Math.round(toTal[0]/gieDataList.length), 'kra':sumKra[0]}, 
									"m2":
										{"scale": Math.round(toTal[1]/gieDataList.length), 'kra':sumKra[1]},
									"m3":
										{"scale": Math.round(toTal[2]/gieDataList.length), 'kra':sumKra[2]},
									},
								"AI_ML_Data_Science":
									{"m1":
										{"scale": Math.round(toTal[3]/gieDataList.length), 'kra':sumKra[3]}, 
									"m2":
										{"scale": Math.round(toTal[4]/gieDataList.length), 'kra':sumKra[4]},
									"m3":
										{"scale": Math.round(toTal[5]/gieDataList.length), 'kra':sumKra[5]},
									},
								"Software_Application_Development":
									{"m1":
										{"scale": Math.round(toTal[6]/gieDataList.length), 'kra':sumKra[6]}, 
									"m2":
										{"scale": Math.round(toTal[7]/gieDataList.length), 'kra':sumKra[7]},
									"m3":
										{"scale": Math.round(toTal[8]/gieDataList.length), 'kra':sumKra[8]},
									},
								"Industry_Product_Design":
									{"m1":
										{"scale": Math.round(toTal[9]/gieDataList.length), 'kra':sumKra[9]}, 
									"m2":
										{"scale": Math.round(toTal[10]/gieDataList.length), 'kra':sumKra[10]},
									"m3":
										{"scale": Math.round(toTal[11]/gieDataList.length), 'kra':sumKra[11]},
									},
								"Software_Platforms":
									{"m1":
										{"scale": Math.round(toTal[12]/gieDataList.length), 'kra':sumKra[12]}, 
									"m2":
										{"scale": Math.round(toTal[13]/gieDataList.length), 'kra':sumKra[13]},
									"m3":
										{"scale": Math.round(toTal[14]/gieDataList.length), 'kra':sumKra[14]},
									},
								"Programming_Application_Platform":
									{"m1":
										{"scale": Math.round(toTal[15]/gieDataList.length), 'kra':sumKra[15]}, 
									"m2":
										{"scale": Math.round(toTal[16]/gieDataList.length), 'kra':sumKra[16]},
									"m3":
										{"scale": Math.round(toTal[17]/gieDataList.length), 'kra':sumKra[17]},
									},
								"IP":
									{"m1":
										{"scale": Math.round(toTal[18]/gieDataList.length), 'kra':sumKra[18]}, 
									"m2":
										{"scale": Math.round(toTal[19]/gieDataList.length), 'kra':sumKra[19]},
									"m3":
										{"scale": Math.round(toTal[20]/gieDataList.length), 'kra':sumKra[20]},
									},
								"Innovation":
									{"m1":
										{"scale": Math.round(toTal[21]/gieDataList.length), 'kra':sumKra[21]}, 
									"m2":
										{"scale": Math.round(toTal[22]/gieDataList.length), 'kra':sumKra[22]},
									"m3":
										{"scale": Math.round(toTal[23]/gieDataList.length), 'kra':sumKra[23]},
									},
							};

				        gieDataList.push(gieDataJson);

				        console.log(gieDataList.length, "records has been parsed");
				        

				    });

    	

    });
    });




app.get('/', function(req,res)
	{
		res.render("index", {"candidate":gieDataList});
	}
);

app.listen(process.env.PORT || port, function()
	{
		console.log("Listening on port number", process.env.PORT || port);
	});