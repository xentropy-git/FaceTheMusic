## Configuring the project

This project uses Aspire to manage the docker containers and infrastructure.
To use the persistent volume, you need to define a postgres password in the
user secrets for the AppHost project.

From within the src/FaceTheMusic.AppHost directory, run the following command:

```bash
dotnet user-secrets set Parameters:postgresql-password <password>
```

## Adding migrations

The solution has entity framework migrations configured in the infrastructure project.

From within the src/FaceTheMusic.Api directory, run the following command:

```bash
dotnet ef migrations add <migration-name> --project ../FaceTheMusic.Infrastructure/FaceTheMusic.Infrastructure.csproj
```
