var express = require('express'),
	app = express(),
	fs = require('fs'),
	CsvReadableStream = require('csv-reader');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = 8080;

var name = "Teste";
var gieDataList = [];

var marchData = fs.createReadStream('march_data_cleaned.csv', 'utf8');
var mayData = fs.createReadStream('may_data_cleaned.csv', 'utf8');


marchData
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	if (row[0]!== undefined)
    	{ 
    		var gieDataJson = {
					"name":row[0],
					"Hardware_IoT":
						{"march":
							{"scale": Number(row[10]), 'kra':row.slice(1, 10)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"AI_ML_Data_Science":
						{"march":
							{"scale": Number(row[17]), 'kra':row.slice(11, 17)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Application_Development":
						{"march":
							{"scale": Number(row[23]), 'kra':row.slice(18, 23)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"Industry_Product_Design":
						{"march":
							{"scale": Number(row[29]), 'kra':row.slice(24, 29)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"Software_Platforms":
						{"march":
							{"scale": Number(row[36]), 'kra':row.slice(30, 36)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"Programming_Application_Platform":
						{"march":
							{"scale": Number(row[41]), 'kra':row.slice(37, 41)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"IP":
						{"march":
							{"scale": Number(row[44]), 'kra':row.slice(42, 44)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					"Innovation":
						{"march":
							{"scale": Number(row[52]), 'kra':row.slice(45, 52)}, 
						"may":
							{"scale": 0, 'kra':undefined},
						},
					};
    		gieDataList.push(gieDataJson);
    	}
    })
    .on('end', function (data) {
    	// console.log(gieDataList);
        // console.log("Found ", gieDataList.length, "records.");
    });

var index = 0;
mayData
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	
    	
    	if (row[0] == gieDataList[index]['name'])
    	{ 


			gieDataList[index].Hardware_IoT.may.kra = row.slice(1, 10);
			gieDataList[index].Hardware_IoT.may.scale = Number(row[10])
	    	gieDataList[index].AI_ML_Data_Science.may.kra= row.slice(11, 17);
	    	gieDataList[index].AI_ML_Data_Science.may.scale=Number(row[17]);
	    	gieDataList[index].Software_Application_Development.may.kra= row.slice(18, 23); 
	    	gieDataList[index].Software_Application_Development.may.scale=Number(row[23]) 
	    	gieDataList[index].Industry_Product_Design.may.kra= row.slice(24, 29);
	    	gieDataList[index].Industry_Product_Design.may.scale=Number(row[29])
	    	gieDataList[index].Software_Platforms.may.kra= row.slice(30, 36);
	    	gieDataList[index].Software_Platforms.may.scale=Number(row[36])
	    	gieDataList[index].Programming_Application_Platform.may.kra= row.slice(37, 41);
	    	gieDataList[index].Programming_Application_Platform.may.scale=Number(row[41])
	    	gieDataList[index].IP.may.kra= row.slice(42, 44);
	    	gieDataList[index].IP.may.scale=Number(row[44])
	    	gieDataList[index].Innovation.may.kra= row.slice(45, 52);
	    	gieDataList[index].Innovation.may.scale=Number(row[52]);       	
        
    	}
    	index += 1;	        

    })
    .on('end', function (data) {
    	var toTal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var kra = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

        for (ps of gieDataList){
        	var localIndex = 0;
        	for (key of Object.keys(ps)){
        		if (key == "name") continue;
        		toTal[localIndex] += ps[key]["march"]["scale"];
        		toTal[localIndex+1] += ps[key]["may"]["scale"];
        		kra[localIndex].push(ps[key]["march"]["kra"]);
        		kra[localIndex+1].push(ps[key]["may"]["kra"]);
        		localIndex += 2;
        	}
        }

        var sumKra = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        for (eachKraIndex of Object.keys(kra)){
        	var init = true;
        	for (eachCandidate of kra[eachKraIndex]){
        		// console.log(eachCandidate);
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
					{"march":
						{"scale": parseInt(toTal[0]/gieDataList.length), 'kra':sumKra[0]}, 
					"may":
						{"scale": parseInt(toTal[1]/gieDataList.length), 'kra':sumKra[1]},
					},
				"AI_ML_Data_Science":
					{"march":
						{"scale": parseInt(toTal[2]/gieDataList.length), 'kra':sumKra[2]}, 
					"may":
						{"scale": parseInt(toTal[3]/gieDataList.length), 'kra':sumKra[3]},
					},
				"Software_Application_Development":
					{"march":
						{"scale": parseInt(toTal[4]/gieDataList.length), 'kra':sumKra[4]}, 
					"may":
						{"scale": parseInt(toTal[5]/gieDataList.length), 'kra':sumKra[5]},
					},
				"Industry_Product_Design":
					{"march":
						{"scale": parseInt(toTal[6]/gieDataList.length), 'kra':sumKra[6]}, 
					"may":
						{"scale": parseInt(toTal[7]/gieDataList.length), 'kra':sumKra[7]},
					},
				"Software_Platforms":
					{"march":
						{"scale": parseInt(toTal[8]/gieDataList.length), 'kra':sumKra[8]}, 
					"may":
						{"scale": parseInt(toTal[9]/gieDataList.length), 'kra':sumKra[9]},
					},
				"Programming_Application_Platform":
					{"march":
						{"scale": parseInt(toTal[10]/gieDataList.length), 'kra':sumKra[10]}, 
					"may":
						{"scale": parseInt(toTal[11]/gieDataList.length), 'kra':sumKra[11]},
					},
				"IP":
					{"march":
						{"scale": parseInt(toTal[12]/gieDataList.length), 'kra':sumKra[12]}, 
					"may":
						{"scale": parseInt(toTal[13]/gieDataList.length), 'kra':sumKra[13]},
					},
				"Innovation":
					{"march":
						{"scale": parseInt(toTal[14]/gieDataList.length), 'kra':sumKra[14]}, 
					"may":
						{"scale": parseInt(toTal[15]/gieDataList.length), 'kra':sumKra[15]},
					},
			};

        gieDataList.push(gieDataJson);
        console.log(gieDataList.length, "records has been parsed");
        

    });


app.get('/', function(req,res)
	{
		res.render("index", {"candidate":gieDataList});
	}
);

app.listen(port, function()
	{
		console.log("Listening on port number", port);
	});