<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Article
 * @ApiResource(
 *          attributes={"force_eager"=false},
 *          normalizationContext={"groups"={"read:article"}},
 * )
 * @ORM\Table(name="article")
 * @ORM\Entity
 */
class Article
{
    /**
     * @var string
     *
     * @ORM\Column(name="refArt", type="string", length=6, nullable=false)
     * @ORM\Id 
     * @Groups({"read:article"})
     */
    private $refart;

    /**
     * @var string
     *
     * @ORM\Column(name="descArt", type="string", length=200, nullable=false)
     * @Groups({"read:article"})
     */
    private $descart;

    /**
     * @var float
     *
     * @ORM\Column(name="prixHTArt", type="float", precision=15, scale=5, nullable=false)
     * @Groups({"read:article",
     *          "read:commande"
     * })
     */
    private $prixhtart;

    /**
     * @var float
     *
     * @ORM\Column(name="poidsArt", type="float", precision=6, scale=3, nullable=false)
     * @Groups({"read:article"})
     */
    private $poidsart;

    /**
     * @var string
     *
     * @ORM\Column(name="typeArt", type="string", length=0, nullable=false)
     * @Groups({"read:article"})
     */
    private $typeart;

    /**
     * @var int
     *
     * @ORM\Column(name="qtestock", type="integer", nullable=false)
     * @Groups({"read:article"})
     */
    private $qtestock = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="stockalert", type="integer", nullable=false)
     * @Groups({"read:article"})
     */
    private $stockalert = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="delailiv", type="integer", nullable=false)
     * @Groups({"read:article"})
     */
    private $delailiv;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Commande", mappedBy="refart")
     */
    private $numcde;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->numcde = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getRefart(): ?string
    {
        return $this->refart;
    }

    public function setRefart(string $refArt): self
    {
        $this->refart = $refArt;

        return $this;
    }

    public function getDescart(): ?string
    {
        return $this->descart;
    }

    public function setDescart(string $descart): self
    {
        $this->descart = $descart;

        return $this;
    }

    public function getPrixhtart(): ?float
    {
        return $this->prixhtart;
    }

    public function setPrixhtart(float $prixhtart): self
    {
        $this->prixhtart = $prixhtart;

        return $this;
    }

    public function getPoidsart(): ?float
    {
        return $this->poidsart;
    }

    public function setPoidsart(float $poidsart): self
    {
        $this->poidsart = $poidsart;

        return $this;
    }

    public function getTypeart(): ?string
    {
        return $this->typeart;
    }

    public function setTypeart(string $typeart): self
    {
        $this->typeart = $typeart;

        return $this;
    }

    public function getQtestock(): ?int
    {
        return $this->qtestock;
    }

    public function setQtestock(int $qtestock): self
    {
        $this->qtestock = $qtestock;

        return $this;
    }

    public function getStockalert(): ?int
    {
        return $this->stockalert;
    }

    public function setStockalert(int $stockalert): self
    {
        $this->stockalert = $stockalert;

        return $this;
    }

    public function getDelailiv(): ?int
    {
        return $this->delailiv;
    }

    public function setDelailiv(int $delailiv): self
    {
        $this->delailiv = $delailiv;

        return $this;
    }

    /**
     * @return Collection|Commande[]
     */
    public function getNumcde(): Collection
    {
        return $this->numcde;
    }

    public function addNumcde(Commande $numcde): self
    {
        if (!$this->numcde->contains($numcde)) {
            $this->numcde[] = $numcde;
            $numcde->addRefart($this);
        }

        return $this;
    }

    public function removeNumcde(Commande $numcde): self
    {
        if ($this->numcde->contains($numcde)) {
            $this->numcde->removeElement($numcde);
            $numcde->removeRefart($this);
        }

        return $this;
    }

}
