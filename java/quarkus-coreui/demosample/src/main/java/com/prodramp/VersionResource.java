package com.prodramp;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/version")
public class VersionResource {

    @ConfigProperty(name = "application.version")
    String appVer;


    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String AppVersion() {
        return (appVer);
    }
}
