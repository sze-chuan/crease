#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used for VS debugging on Docker
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
ENV ASPNETCORE_URLS=https://+:5001;http://+:5000
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y build-essential nodejs
WORKDIR /src
COPY ["src/Crease.WebUI/Crease.WebUI.csproj", "src/Crease.WebUI/"]
COPY ["src/Crease.Application/Crease.Application.csproj", "src/Crease.Application/"]
COPY ["src/Crease.Domain/Crease.Domain.csproj", "src/Crease.Domain/"]
COPY ["src/Crease.Infrastructure/Crease.Infrastructure.csproj", "src/Crease.Infrastructure/"]
RUN dotnet restore "src/Crease.WebUI/Crease.WebUI.csproj"
COPY . .
WORKDIR "/src/src/Crease.WebUI"
RUN dotnet build "Crease.WebUI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Crease.WebUI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crease.WebUI.dll"]