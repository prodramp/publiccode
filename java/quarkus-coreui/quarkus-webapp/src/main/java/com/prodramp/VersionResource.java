package com.prodramp;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/v1/version")
public class VersionResource {

    @ConfigProperty(name="application.version")
    String appVersion;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String AppVersion(){
        String jsonResponse = "{\"status\": \"SUCCESS\", \"message\": \"" + appVersion + "\"}";

        return jsonResponse;
    }

}
