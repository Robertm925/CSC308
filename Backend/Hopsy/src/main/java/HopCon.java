import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class HopCon {
  /*public static void main(String args[]) {
      MongoClient mongoClient;
      mongoClient = new MongoClient(new MongoClientURI("mongodb+srv://42cleslie:password1234@cluster0-gxgoh.mongodb.net/userdb?retryWrites=true&w=majority"));

      MongoDatabase db = mongoClient.getDatabase("test");
      MongoCollection<Document> dbCollection = db.getCollection("testCollection");

      //hopsy.User user = new hopsy.User("johnsmith@gmail.com", "guest");
      //Document userDoc = user.toDoc();
      //insertDoc(dbCollection, userDoc);
      Document myDoc = findDoc(dbCollection, "email", "jsmith@gmial.com");
      System.out.print(myDoc.getString("email"));

      //Document doc = new Document("email", "jsmith@gmial.com").append("password", "mypass");
      //dbCollection.insertOne(doc);

  }*/

  private static boolean insertDoc(MongoCollection<Document> collection, Document doc) {
    try {
      collection.insertOne(doc);
    } catch (MongoException ex) {
      System.out.print("THERE WAS AN ERROR: " + ex.toString());
      return false;
    }
    return true;
  }

  private static Document findDoc(MongoCollection<Document> collection, String key, String value) {
    return collection.find(eq(key, value)).first();
  }
}
