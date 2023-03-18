#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used for VS debugging on Docker
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ENV ASPNETCORE_URLS=https://+:5001;http://+:5000
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Crease.Api/Crease.Api.csproj", "src/Crease.Api/"]
RUN dotnet restore "src/Crease.Api/Crease.Api.csproj"
COPY . .
WORKDIR "/src/src/Crease.Api"
RUN dotnet build "Crease.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Crease.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crease.Api.dll"]