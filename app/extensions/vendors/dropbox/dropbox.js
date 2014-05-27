/*
jmvc_db
App key twg0inkl7altxp6
App secret htz6a6rceof3eo6
*/
JMVC.extend('vendors/dropbox', function () {

    var APP_KEY = 'twg0inkl7altxp6',
        filebase = 'jmvc_db/';

    JMVC.head.lib('dropbox');


    function DropBoxDataStore() {
        this.client = null;
        this.tables = {};
        this.dataStoreManager = null;
        this.dataStore = null;
    }
    DropBoxDataStore.prototype.login = function (cb) {
        var self = this;
        self.client = new Dropbox.Client({key: APP_KEY});

        self.client.authenticate({interactive: true}, function (error) {
            if (error) {
                JMVC.debug('Authentication error: ' + error);
            }
        });

        self.client.authenticate();

        if (self.client.isAuthenticated()) {
            self.dataStoreManager = self.client.getDatastoreManager();
            self.dataStoreManager.openDefaultDatastore(function (error, dataStore) {
                if (error) {
                    alert('Error opening default datastore: ' + error);
                }
                self.dataStore = dataStore;
                cb && cb.call();
            });
            return true;
        } else {
            return false;
        }
    };
    DropBoxDataStore.prototype.ensureTable = function (tableName) {
        this.tables[tableName] || this.getTable(tableName);
    }

    DropBoxDataStore.prototype.logout = function () {
        this.client.signOut();
    };

    DropBoxDataStore.prototype.getTable = function (tableName) {
        var tmp =  this.dataStore.getTable(tableName);
        if (tmp) {
            this.tables[tableName] = tmp;
            return this.tables[tableName];
        }
        return false;
    };

    DropBoxDataStore.prototype.insert = function (tableName, obj) {
        this.ensureTable(tableName);
        return this.tables[tableName].insert(obj);
    };

    DropBoxDataStore.prototype.deleteItem = function (item) {
        item.deleteRecord();
    };

    DropBoxDataStore.prototype.getItemField = function (item, fieldName) {
        item.get(fieldName);
    };

    DropBoxDataStore.prototype.setItemField = function (item, fieldName, fieldValue) {
        item.set(fieldName, fieldValue);
    };

    DropBoxDataStore.prototype.query = function (tableName, query) {
        this.ensureTable(tableName);
        return this.tables[tableName].query(query);
    };

    DropBoxDataStore.prototype.truncate = function (tableName) {
        this.ensureTable(tableName);

        //most generic query
        //
        var res = this.tables[tableName].query();

        for (var i = 0, l = res.length; i < l; i++) {
            this.deleteItem(res[i]);
        }
    };

    DropBoxDataStore.prototype.getFileContent = function (filePath, cb) {
        this.client.readFile(filebase + filePath, cb);
    };
    
    return {
        create : function () {
            return new DropBoxDataStore();
        }
    };
});


/*

//--------------------------------------------------------------------------------------------------------- 
// Instantiate the in-browser file reader
//--------------------------------------------------------------------------------------------------------- 
    var fileReader= new FileReader({'blob': true});

//--------------------------------------------------------------------------------------------------------- 
// Once the file reader has read the file into memory, 
// do the dropbox upload 
//--------------------------------------------------------------------------------------------------------- 
    fileReader.onload = function(e) { 
    
        // Get the raw file to PUT 
        var rawBytes = e.target.result; 

        // This would be handled by oAuth - hardcoding like this is unsecure 
        var uid = Math.random().toString(36).substr(2,9); 
        var oauth_token = 'XXXXXXX'; 
        var oauth_consumer_key = 'XXXXXXX'; 
        var oauth_signature = 'XXXXXXX'; 

        // Raw XMLHttpRequest 
        var xmlhttp = new XMLHttpRequest(); 

        // Handle the httprequest completion 
        xmlhttp.onreadystatechange = function(){ 

            if (xmlhttp.readyState==4 && xmlhttp.status==200) { 
                alert('Uploaded!'); 
            } } 

            // Open the connection 
            xmlhttp.open( "PUT", "https://api-content.dropbox.com/1/files_put/dropbox//nfprojects/"+_interface.parentid+"/"+uid+fileName, true ); 

            // Set the headers so the transfer works 
            xmlhttp.setRequestHeader( "Authorization", 'OAuth oauth_version="2.0",oauth_signature_method="PLAINTEXT",oauth_consumer_key="'+oauth_token+'",oauth_token="'+oauth_consumer_key+'",oauth_signature="'+oauth_signature+'"' ); 
            xmlhttp.setRequestHeader( "Accept", '"text/plain; charset=iso-8859-1", "Content-Type": "text/plain; charset=iso-8859-1"' ); 
            
            // Send the data 
            xmlhttp.send( rawBytes ); 
        }; 

//--------------------------------------------------------------------------------------------------------- 
// Start by loading the file into memory 
//--------------------------------------------------------------------------------------------------------- 
    fileReader.readAsArrayBuffer( file ); 

 */