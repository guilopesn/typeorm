import { ColumnMetadata } from "../../metadata/ColumnMetadata"
import { RelationMetadata } from "../../metadata/RelationMetadata"
import { EntityManager } from "../../entity-manager/EntityManager"
import { QueryRunner } from "../../query-runner/QueryRunner"
import { DataSource } from "../../data-source/DataSource"
import { EntityMetadata } from "../../metadata/EntityMetadata"
import { ObjectLiteral } from "../../common/ObjectLiteral"

/**
 * UpdateEvent is an object that broadcaster sends to the entity subscriber when entity is being updated in the database.
 */
export interface UpdateEvent<Entity, Data = ObjectLiteral> {
    /**
     * Connection used in the event.
     */
    connection: DataSource

    /**
     * QueryRunner used in the event transaction.
     * All database operations in the subscribed event listener should be performed using this query runner instance.
     */
    queryRunner: QueryRunner<Data>

    /**
     * EntityManager used in the event transaction.
     * All database operations in the subscribed event listener should be performed using this entity manager instance.
     */
    manager: EntityManager

    /**
     * Updating entity.
     * This may absent if entity is updated without being loaded (for examples by cascades).
     */
    entity?: Entity

    /**
     * Metadata of the entity.
     */
    metadata: EntityMetadata

    /**
     * Updating entity in the database.
     */
    databaseEntity: Entity

    /**
     * List of updated columns. In query builder has no affected
     */
    updatedColumns: ColumnMetadata[]

    /**
     * List of updated relations. In query builder has no affected
     */
    updatedRelations: RelationMetadata[]
}
