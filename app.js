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
// var aprilData = fs.createReadStream('may_data_cleaned.csv', 'utf8');
var febData = fs.createReadStream('feb_data_cleaned.csv', 'utf8');
var aprilData = fs.createReadStream('april_data_cleaned.csv', 'utf8');
var juneData = fs.createReadStream('june_data_cleaned.csv', 'utf8');


febData
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	if (row[0]!== undefined)
    	{ 
    		var gieDataJson = {
					"name":row[0],
					"Hardware_IoT":
						{
							"feb":
							{"scale": Number(row[10]), 'kra':row.slice(1, 10)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"AI_ML_Data_Science":
						{"feb":
							{"scale": Number(row[17]), 'kra':row.slice(11, 17)}, 
						"april":
							{"scale": 0, 'kra':undefined},
						"june":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Application_Development":
						{
							"feb":
							{"scale": Number(row[23]), 'kra':row.slice(18, 23)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"Industry_Product_Design":
						{
							"feb":
							{"scale": Number(row[29]), 'kra':row.slice(24, 29)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Platforms":
						{
							"feb":
							{"scale": Number(row[36]), 'kra':row.slice(30, 36)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"Programming_Application_Platform":
						{
							"feb":
							{"scale": Number(row[41]), 'kra':row.slice(37, 41)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"IP":
						{
							"feb":
							{"scale": Number(row[44]), 'kra':[Number(row[42]), Number(row[42]), Number(row[43])]}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					"Innovation":
						{
							"feb":
							{"scale": Number(row[52]), 'kra':row.slice(45, 52)}, 
							"april":
							{"scale": 0, 'kra':undefined},
							"june":
							{"scale": 0, 'kra':undefined},
						},
					};
    		gieDataList.push(gieDataJson);
    	}
    })
    .on('end', function (data) {
    	// console.log(gieDataList[0]);
        

        var index = 0;
		aprilData
		    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
		    .on('data', function (row) {
		    	
		    	if (row[0] == gieDataList[index]['name'])
		    	{ 


					gieDataList[index].Hardware_IoT.april.kra = row.slice(1, 10);
					gieDataList[index].Hardware_IoT.april.scale = Number(row[10])
			    	gieDataList[index].AI_ML_Data_Science.april.kra= row.slice(11, 17);
			    	gieDataList[index].AI_ML_Data_Science.april.scale=Number(row[17]);
			    	gieDataList[index].Software_Application_Development.april.kra= row.slice(18, 23); 
			    	gieDataList[index].Software_Application_Development.april.scale=Number(row[23]) 
			    	gieDataList[index].Industry_Product_Design.april.kra= row.slice(24, 29);
			    	gieDataList[index].Industry_Product_Design.april.scale=Number(row[29])
			    	gieDataList[index].Software_Platforms.april.kra= row.slice(30, 36);
			    	gieDataList[index].Software_Platforms.april.scale=Number(row[36])
			    	gieDataList[index].Programming_Application_Platform.april.kra= row.slice(37, 41);
			    	gieDataList[index].Programming_Application_Platform.april.scale=Number(row[41])
			    	gieDataList[index].IP.april.kra= [Number(row[42]), Number(row[42]), Number(row[43])];
			    	gieDataList[index].IP.april.scale=Number(row[44])
			    	gieDataList[index].Innovation.april.kra= row.slice(45, 52);
			    	gieDataList[index].Innovation.april.scale=Number(row[52]);       	
		        
		    	}
		    	index += 1;	        

		    })
		    .on('end', function (data) {
		    	var index = 0;
				juneData
				    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
				    .on('data', function (row) {
				    	
				    	
				    	if (row[0] == gieDataList[index]['name'])
				    	{ 


							gieDataList[index].Hardware_IoT.june.kra = row.slice(1, 10);
							gieDataList[index].Hardware_IoT.june.scale = Number(row[10])
					    	gieDataList[index].AI_ML_Data_Science.june.kra= row.slice(11, 17);
					    	gieDataList[index].AI_ML_Data_Science.june.scale=Number(row[17]);
					    	gieDataList[index].Software_Application_Development.june.kra= row.slice(18, 23); 
					    	gieDataList[index].Software_Application_Development.june.scale=Number(row[23]) 
					    	gieDataList[index].Industry_Product_Design.june.kra= row.slice(24, 29);
					    	gieDataList[index].Industry_Product_Design.june.scale=Number(row[29])
					    	gieDataList[index].Software_Platforms.june.kra= row.slice(30, 36);
					    	gieDataList[index].Software_Platforms.june.scale=Number(row[36])
					    	gieDataList[index].Programming_Application_Platform.june.kra= row.slice(37, 41);
					    	gieDataList[index].Programming_Application_Platform.june.scale=Number(row[41])
					    	gieDataList[index].IP.june.kra= [Number(row[42]), Number(row[42]), Number(row[43])];
					    	gieDataList[index].IP.june.scale=Number(row[44])
					    	gieDataList[index].Innovation.june.kra= row.slice(45, 52);
					    	gieDataList[index].Innovation.june.scale=Number(row[52]);       	
				        
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
				        		toTal[localIndex] += ps[key]["feb"]["scale"];
				        		toTal[localIndex+1] += ps[key]["april"]["scale"];
				        		toTal[localIndex+2] += ps[key]["june"]["scale"];
				        		kra[localIndex].push(ps[key]["feb"]["kra"]);
				        		kra[localIndex+1].push(ps[key]["april"]["kra"]);
				        		kra[localIndex+2].push(ps[key]["june"]["kra"]);
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
								"name":"Titans",
								"Hardware_IoT":
									{"feb":
										{"scale": Math.round(toTal[0]/gieDataList.length), 'kra':sumKra[0]}, 
									"april":
										{"scale": Math.round(toTal[1]/gieDataList.length), 'kra':sumKra[1]},
									"june":
										{"scale": Math.round(toTal[2]/gieDataList.length), 'kra':sumKra[2]},
									},
								"AI_ML_Data_Science":
									{"feb":
										{"scale": Math.round(toTal[3]/gieDataList.length), 'kra':sumKra[3]}, 
									"april":
										{"scale": Math.round(toTal[4]/gieDataList.length), 'kra':sumKra[4]},
									"june":
										{"scale": Math.round(toTal[5]/gieDataList.length), 'kra':sumKra[5]},
									},
								"Software_Application_Development":
									{"feb":
										{"scale": Math.round(toTal[6]/gieDataList.length), 'kra':sumKra[6]}, 
									"april":
										{"scale": Math.round(toTal[7]/gieDataList.length), 'kra':sumKra[7]},
									"june":
										{"scale": Math.round(toTal[8]/gieDataList.length), 'kra':sumKra[8]},
									},
								"Industry_Product_Design":
									{"feb":
										{"scale": Math.round(toTal[9]/gieDataList.length), 'kra':sumKra[9]}, 
									"april":
										{"scale": Math.round(toTal[10]/gieDataList.length), 'kra':sumKra[10]},
									"june":
										{"scale": Math.round(toTal[11]/gieDataList.length), 'kra':sumKra[11]},
									},
								"Software_Platforms":
									{"feb":
										{"scale": Math.round(toTal[12]/gieDataList.length), 'kra':sumKra[12]}, 
									"april":
										{"scale": Math.round(toTal[13]/gieDataList.length), 'kra':sumKra[13]},
									"june":
										{"scale": Math.round(toTal[14]/gieDataList.length), 'kra':sumKra[14]},
									},
								"Programming_Application_Platform":
									{"feb":
										{"scale": Math.round(toTal[15]/gieDataList.length), 'kra':sumKra[15]}, 
									"april":
										{"scale": Math.round(toTal[16]/gieDataList.length), 'kra':sumKra[16]},
									"june":
										{"scale": Math.round(toTal[17]/gieDataList.length), 'kra':sumKra[17]},
									},
								"IP":
									{"feb":
										{"scale": Math.round(toTal[18]/gieDataList.length), 'kra':sumKra[18]}, 
									"april":
										{"scale": Math.round(toTal[19]/gieDataList.length), 'kra':sumKra[19]},
									"june":
										{"scale": Math.round(toTal[20]/gieDataList.length), 'kra':sumKra[20]},
									},
								"Innovation":
									{"feb":
										{"scale": Math.round(toTal[21]/gieDataList.length), 'kra':sumKra[21]}, 
									"april":
										{"scale": Math.round(toTal[22]/gieDataList.length), 'kra':sumKra[22]},
									"june":
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