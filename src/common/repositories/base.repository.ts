import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly entity: EntityTarget<T>,
    dataSource: DataSource,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  async paginate(
    alias: string,
    query: PaginationQueryDto,
    searchableFields: string[] = [],
    sortWhitelist: string[] = [],
    filters: Record<string, string> = {},
  ): Promise<[T[], number]> {
    const { page, limit, search, sort, order } = query;
    const skip = (page - 1) * limit;

    const qb = this.createQueryBuilder(alias);

    // Search
    if (search && searchableFields.length) {
      const searchConditions = searchableFields.map((field) => {
        return `${alias}.${field} ILIKE :search`;
      });

      qb.where(searchConditions.join(' OR '), { search: `%${search}%` });
    }

    for (const [field, value] of Object.entries(filters)) {
      if (value) {
        qb.andWhere(`${alias}.${field} = :${field}`, { [field]: value });
      }
    }

    // Sort whitelist ✅
    if (sort && sortWhitelist.includes(sort)) {
      qb.orderBy(
        `${alias}.${sort}`,
        (order ?? 'ASC').toUpperCase() as 'ASC' | 'DESC',
      );
    } else {
      qb.orderBy(`${alias}.createdAt`, 'DESC');
    }

    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }
}
