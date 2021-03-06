package hopsy;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.HTTP;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserLoginController {

  @RequestMapping("/login")
  public boolean userLogin(@RequestBody String usr) { //validate a user against the db
    System.out.println("login");

    JSONObject jsObj = new JSONObject(usr);
    MongoClient usrMC = DBUtils.getusrMC();
    MongoDatabase db = usrMC.getDatabase("Users");
    MongoCollection<Document> dbCollection = db.getCollection("users");

    Document doc = DBUtils.findDoc(dbCollection, "email", jsObj.get("name").toString());

    // return new ResponseEntity(HttpStatus.OK);

    return (doc != null && doc.getString("password").equals(jsObj.get("password")));
  }

  @RequestMapping("/GetUserProfile")
  public String getFullName(@RequestBody String usr) { //validate a user against the db
    System.out.println("Get user data");

    JSONObject jsObj = new JSONObject(usr);
    MongoClient usrMC = DBUtils.getusrMC();
    MongoDatabase db = usrMC.getDatabase("Users");
    MongoCollection<Document> dbCollection = db.getCollection("users");

    Document doc = DBUtils.findDoc(dbCollection, "email", jsObj.get("username").toString());

    // return new ResponseEntity(HttpStatus.OK);
    System.out.println(doc.getString("fullname"));
    return doc.getString("fullname");
  }
}
