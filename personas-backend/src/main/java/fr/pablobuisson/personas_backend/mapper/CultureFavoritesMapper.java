package fr.pablobuisson.personas_backend.mapper;

import fr.pablobuisson.personas_backend.dto.CultureFavoritesDto;
import fr.pablobuisson.personas_backend.model.CultureFavorites;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface CultureFavoritesMapper {
    CultureFavoritesMapper INSTANCE = Mappers.getMapper( CultureFavoritesMapper.class );

    CultureFavorites toEntity(CultureFavoritesDto cultureFavoritesDto);

    CultureFavoritesDto toDto(CultureFavorites cultureFavorites);
}
