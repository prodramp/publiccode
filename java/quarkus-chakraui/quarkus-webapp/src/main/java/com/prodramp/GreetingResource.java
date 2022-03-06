package com.prodramp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.vertx.core.json.Json;
import netscape.javascript.JSObject;
import org.jboss.resteasy.annotations.Body;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/v1/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String hello() {
        String resultData = "{\"message\": \"Hello Prodramp\", \"status\": \"SUCCESS\"}";
        return resultData;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String hello(String inputObject){
        ObjectMapper mapper = new ObjectMapper();
        String param = "bad data";
        try {
            JsonNode postData = mapper.readTree(inputObject);
            param = postData.findValue("postParam").asText();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String resultData = "{\"message\": \"" + param + "\", \"status\": \"SUCCESS\"}";
        return resultData;
    }
}