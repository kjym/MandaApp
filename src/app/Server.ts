//Allow Cross-Site-Request
require 'headers.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

require 'config.php';

$app = new \Slim\App($config);

require 'dependencies.php';

//Register
$app->post('/api/register', function (Request $request, Response $response, array $args) {
//echo "Register user";
   $username = $request->getParam('username');

   //Check if username exists before we register new user
   $query = "SELECT id FROM user WHERE username = '$username'";
   $stmt = $this->db->prepare($query);
   $stmt->execute();
  
   if(!$stmt->rowCount()){ //proceed to register if username does not exist
    
        $password = MD5($request->getParam('password')); //Convert to MD5
        $firstname = $request->getParam('firstname');
        $lastname = $request->getParam('lastname');

        $query = "INSERT INTO user (id, username, password, firstname, lastname) VALUES (NULL, '$username', '$password', '$firstname', '$lastname')";
    
        $stmt = $this->db->prepare($query); 

        if($stmt->execute()){//save to database
            return $response->withJson(['success'=>true, 'message'=>'user registered successful']);
        }

        return $response->withJson(['success'=>false, 'message'=>'failed to register a user, try again']);
   }
//refuse to register if username exists
return $response->withJson(['success'=>false, 'message'=>'username is in use, try another']);

});



//Update
$app->put('/api/update', function (Request $request, Response $response, array $args) {
   
    $userid = $request->getParam('userid');
    $username = $request->getParam('username');
    //check if user exists
    $query = "SELECT id FROM user WHERE id != '$userid' AND username = '$username'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();

    if(!$stmt->rowCount()){//Proceed to update
 
        $firstname = $request->getParam('firstname');
        $lastname = $request->getParam('lastname');

        $query = "UPDATE user SET username='$username', firstname='$firstname', lastname='$lastname' WHERE id='$userid'";

        $stmt = $this->db->prepare($query);

        if($stmt->execute()){
            return $response->withJson(['success'=>true, 'info'=>'user info updated successful']);
        }
        return $response->withJson(['success'=>false, 'info'=>'user update failed']);
    }

   //refuse to update if username exists
    return $response->withJson(['success'=>false, 'info'=>'username is in use, try another']);
});

//delete
$app->delete('/api/delete/{userid}', function (Request $request, Response $response, array $args) {
   
    $userid = $args['userid'];
    
    $query = "DELETE FROM user WHERE id='$userid'";
    $stmt = $this->db->prepare($query);

    if($stmt->execute()){
        return $response->withJson(['success'=>true, 'info'=>'user deleted successful']);
    }

    return $response->withJson(['success'=>false, 'info'=>'failed to deleted user']);
});

//Login
$app->post('/api/login', function (Request $request, Response $response, array $args) {

    $username = $request->getParam('username');
    $password = MD5($request->getParam('password'));

    $query = "SELECT * FROM user WHERE username='$username' AND password='$password'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    $results = [];
    if($stmt->rowCount() > 0){
        $data = $stmt->fetch(PDO::FETCH_OBJ);
        $results['username'] = $data->username;
        $results['firstname'] = $data->firstname;
        $results['lastname'] = $data->lastname;
        
        return $response->withJson(['success'=>true, 'info'=> $results]);
    }else{
        return $response->withJson(['success'=>false, 'info'=>'wrong username or password']);
    }
   
    return $response->withJson(['success'=>false, 'info'=>'failed to login']);
});

//Get users Info
$app->get('/api/users/info', function (Request $request, Response $response, array $args) {
   
    $query = "SELECT id AS userid, username, firstname, lastname FROM user";

    $stmt = $this->db->prepare($query);
    $stmt->execute();

    if($stmt->rowCount() > 0){
        $results = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $response->withJson(['success'=>true, 'info'=> $results]);
    
    }
       
    return $response->withJson(['success'=>false, 'info'=> 'users info not found']);
});

//Get user info
$app->get('/api/user/info/{userid}', function (Request $request, Response $response, array $args) {
    $userid = $args['userid'];
    
    $query = "SELECT id AS userid, username, firstname, lastname FROM user WHERE id='$userid'";

    $stmt = $this->db->prepare($query);
    $stmt->execute();

    if($stmt->rowCount() > 0){
        $results = $stmt->fetch(PDO::FETCH_OBJ);
        return $response->withJson(['success'=>true, 'info'=> $results]);
    
    }
       
    return $response->withJson(['success'=>false, 'info'=> 'user info not found']);
});

$app->run();
