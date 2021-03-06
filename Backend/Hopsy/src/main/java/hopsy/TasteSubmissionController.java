package hopsy;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.mongodb.client.model.Filters.eq;

@RestController
public class TasteSubmissionController {

  @RequestMapping("/submit-tastes") //endpoint for taste submission
  public boolean formSubmission(@RequestBody String form) {
    System.out.println(form);

    JSONObject json = new JSONObject(form);

    String name = json.getString("name");

    MongoClient usrMC = DBUtils.getusrMC();
    MongoDatabase db = usrMC.getDatabase("Users");
    MongoCollection<Document> dbCollection = db.getCollection("users");

    dbCollection.updateOne(eq("email", name),
            new Document("$set", new Document("preferences", form)));

    return true;
  }

  public String getForm(String name) {
    MongoClient usrMC = DBUtils.getusrMC();
    MongoDatabase db = usrMC.getDatabase("Users");
    MongoCollection<Document> dbCollection = db.getCollection("users");

    Document doc = DBUtils.findDoc(dbCollection, "email", name);

    return doc.getString("preferences");
  }
}
