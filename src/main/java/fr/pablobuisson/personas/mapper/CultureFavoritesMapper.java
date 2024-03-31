package fr.pablobuisson.personas.mapper;

import fr.pablobuisson.personas.dto.CultureFavoritesDto;
import fr.pablobuisson.personas.model.CultureFavorites;
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
