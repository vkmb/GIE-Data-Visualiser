var express = require('express'),
	app = express(),
	fs = require('fs'),
	CsvReadableStream = require('csv-reader');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = 3000;

var name = "Teste";
var gieDataList = [];

var inputStream = fs.createReadStream('data.csv', 'utf8');
var inputStream2 = fs.createReadStream('march_kra_data.csv', 'utf8');
var inputStream3 = fs.createReadStream('may_kra_data.csv', 'utf8'); 

inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	if (row[0][0] !== undefined)
    	{ 
    		var gieDataJson = {
	"name":row[1],
	"Hardware_IoT":
		{"march":
			{"level":row[2], "scale": parseInt(row[3]), 'kra':undefined}, 
		"may":
			{"level":row[4], "scale": parseInt(row[5]), 'kra':undefined},
		},
	"AI_ML_Data_Science":
		{"march":
			{"level":row[6], "scale": parseInt(row[7]), 'kra':undefined}, 
		"may":
			{"level":row[8], "scale": parseInt(row[9]), 'kra':undefined},
		},
	"Software_Application_Development":
		{"march":
			{"level":row[10], "scale": parseInt(row[11]), 'kra':undefined}, 
		"may":
			{"level":row[12], "scale": parseInt(row[13]), 'kra':undefined},
		},
	"Industry_Product_Design":
		{"march":
			{"level":row[14], "scale": parseInt(row[15]), 'kra':undefined}, 
		"may":
			{"level":row[16], "scale": parseInt(row[17]), 'kra':undefined},
		},
	"Software_Platforms":
		{"march":
			{"level":row[18], "scale": parseInt(row[19]), 'kra':undefined}, 
		"may":
			{"level":row[20], "scale": parseInt(row[21]), 'kra':undefined},
		},
	"Programming_Application_Platform":
		{"march":
			{"level":row[22], "scale": parseInt(row[23]), 'kra':undefined}, 
		"may":
			{"level":row[24], "scale": parseInt(row[25]), 'kra':undefined},
		},
	"IP":
		{"march":
			{"level":row[26], "scale": parseInt(row[27]), 'kra':undefined}, 
		"may":
			{"level":row[28], "scale": parseInt(row[29]), 'kra':undefined},
		},
	"Innovation":
		{"march":
			{"level":row[30], "scale": parseInt(row[31]), 'kra':undefined}, 
		"may":
			{"level":row[32], "scale": parseInt(row[33]), 'kra':undefined},
		},
};
    		gieDataList.push(gieDataJson);

        	// console.log(row[0]);
        	// console.log(row[33], "----------");

    	}
        

    })
    .on('end', function (data) {
        console.log("Found ", gieDataList.length, "records.");
    });

var index = 0;
inputStream2
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	
    	// console.log(row[0],gieDataList[index].name);
    	if (row[0] == gieDataList[index].name)
    	{ 


			gieDataList[index].Hardware_IoT.march.kra = row.slice(2, 11);
	    	gieDataList[index].AI_ML_Data_Science.march.kra= row.slice(11, 17);
	    	gieDataList[index].Software_Application_Development.march.kra= row.slice(17, 22); 
	    	gieDataList[index].Industry_Product_Design.march.kra= row.slice(22, 27);
	    	gieDataList[index].Software_Platforms.march.kra= row.slice(27, 33);
	    	gieDataList[index].Programming_Application_Platform.march.kra= row.slice(33, 37);
	    	gieDataList[index].IP.march.kra= row.slice(37, 39);
	    	gieDataList[index].Innovation.march.kra= row.slice(39, );


        	// console.log(row);
        	// console.log(row[33], "----------");
        	
        
    	}
    	
    	index = index + 1;	

    	
    	
        

    })
    .on('end', function (data) {

        // console.log(gieDataList[0]);
    });
var index2 = 0;
inputStream3
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
    	// console.log(row, gieDataList[1]);
    	if (row[0] == gieDataList[index2].name)
    	{ 

			gieDataList[index2].Hardware_IoT.may.kra = row.slice(2, 11);
	    	gieDataList[index2].AI_ML_Data_Science.may.kra= row.slice(11, 17);
	    	gieDataList[index2].Software_Application_Development.may.kra= row.slice(17, 22); 
	    	gieDataList[index2].Industry_Product_Design.may.kra= row.slice(22, 27);
	    	gieDataList[index2].Software_Platforms.may.kra= row.slice(27, 33);
	    	gieDataList[index2].Programming_Application_Platform.may.kra= row.slice(33, 37);
	    	gieDataList[index2].IP.may.kra= row.slice(37, 39);
	    	gieDataList[index2].Innovation.may.kra= row.slice(39, );


        	// console.log(row[0]);
        	// console.log(row[33], "----------");

    	}
    	index2 = index2 + 1;
    }).on('end', function (data) {

        // console.log(gieDataList[0]);
        
        // gieDataList.push();
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